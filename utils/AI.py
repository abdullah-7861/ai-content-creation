import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np
import random
from '/utils/summaries_train.csv' import summaries_train.csv 

# 1. Define the TextDataset class to preprocess and handle text data
class TextDataset(Dataset):
    def __init__(self, text, seq_length=50):
        self.text = text
        self.seq_length = seq_length
        self.chars = sorted(list(set(text)))
        self.char_to_idx = {ch: i for i, ch in enumerate(self.chars)}
        self.idx_to_char = {i: ch for i, ch in enumerate(self.chars)}
        self.data = [self.char_to_idx[c] for c in text]

    def __len__(self):
        return len(self.data) - self.seq_length

    def __getitem__(self, idx):
        return (
            torch.tensor(self.data[idx:idx+self.seq_length], dtype=torch.long),
            torch.tensor(self.data[idx+1:idx+self.seq_length+1], dtype=torch.long)
        )

# 2. Define the LSTM-based TextGenerationModel
class TextGenerationModel(nn.Module):
    def __init__(self, vocab_size, embedding_dim=128, hidden_dim=256, num_layers=2):
        super(TextGenerationModel, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_dim, vocab_size)

    def forward(self, x, hidden=None):
        x = self.embedding(x)
        output, hidden = self.lstm(x, hidden)
        output = self.fc(output)
        return output, hidden

# 3. Initialize dataset and model parameters
text = "Your large text data goes here..."  # Replace this with your text data
seq_length = 50  # Length of each sequence for training
batch_size = 64
embedding_dim = 128
hidden_dim = 256
num_layers = 2
num_epochs = 20
learning_rate = 0.001

# 4. Create dataset, dataloader, and model
dataset = TextDataset(text, seq_length=seq_length)
dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
model = TextGenerationModel(len(dataset.chars), embedding_dim, hidden_dim, num_layers)
optimizer = optim.Adam(model.parameters(), lr=learning_rate)
criterion = nn.CrossEntropyLoss()

# 5. Train the model
for epoch in range(num_epochs):
    hidden = None
    epoch_loss = 0
    for X, y in dataloader:
        optimizer.zero_grad()
        output, hidden = model(X, hidden)
        loss = criterion(output.view(-1, len(dataset.chars)), y.view(-1))
        loss.backward()
        optimizer.step()
        epoch_loss += loss.item()
    print(f'Epoch {epoch + 1}, Loss: {epoch_loss / len(dataloader)}')

# 6. Generate text with the trained model
def generate_text(model, start_text, gen_length=100):
    model.eval()
    input_seq = torch.tensor([dataset.char_to_idx[c] for c in start_text], dtype=torch.long).unsqueeze(0)
    generated_text = start_text
    hidden = None
    for _ in range(gen_length):
        output, hidden = model(input_seq, hidden)
        last_char_logits = output[0, -1]
        p = torch.nn.functional.softmax(last_char_logits, dim=0).detach().cpu().numpy()
        next_char_idx = np.random.choice(len(dataset.chars), p=p)
        next_char = dataset.idx_to_char[next_char_idx]
        generated_text += next_char
        input_seq = torch.cat((input_seq, torch.tensor([[next_char_idx]], dtype=torch.long)), dim=1)[:, -seq_length:]
    return generated_text

# Example usage of text generation
start_text = "Once upon a time"
generated_text = generate_text(model, start_text, gen_length=200)
print("Generated text:", generated_text)
