export default  [
    
    {
        name: 'Blog Content',
        desc: 'An AI tool that serves as your personal blog content writter.',
        category: 'blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/4905/4905454.png',
        slug: 'blog-content-generation',
        aiPrompt: 'Generate Blog Content based on topic and outline in rich text editor format',
        form: [
            {
                label: 'Enter your blog topic',
                field: 'input',
                name: 'topic',
                required:true
            },
            {
                label: 'Enter blog Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Blog Topic Ideas',
        desc: 'An AI tool that serves as your personal blog topic idea writer.',
        category: 'Blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/11497/11497847.png',
        slug: 'blog-topic-idea',
        aiPrompt: 'Generate top 5 Blog Topic Ideas in bullet point only, (no Description) based on niche in rich text editor format',
        form: [
            {
                label: 'Enter your Niche',
                field: 'input',
                name: 'niche',
                required:true
            },
        ]
    },
    {

        name: 'Youtube Description',
        desc: 'An AI tool that generates youtube video descriptions for you.',
        category: 'Youtube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111748.png',
        slug: 'youtube-description',
        aiPrompt: 'Generate Youtube description with emoji under 4-5 lines based on topic and outline in rich text editor format',
        form: [
            {
                label: 'Enter your blog topic/title',
                field: 'input',
                name: 'topic',
                required:true
            },
            {
                label: 'Enter youtube Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    

    {
        name: 'Rewrite Article (Plagiarism Free)',
        desc: 'Use this tool to rewrite existing Article or Blog Post which can bypass AI detectors and also make it plagiarism free.',
        icon: 'https://cdn-icons-png.flaticon.com/128/3131/3131607.png',
        category: 'Rewriting Tool',
        slug: 'rewrite-article',
        aiPrompt: 'Rewrite give article without any Plagiarism in rich text editor format',
        form: [
            {
                label: '🤖 Provide your Article/Blogpost or any other content to rewrite.',
                field: 'textarea',
                name: 'article',
                required:true
            }
        ]
    },
    {
        name: 'Text Improver',
        desc: 'This handy tool refines your writing, eliminating errors and redundancies for a clear, readable result. It also offers a comprehensive tone analysis and suggests better word choices.',
        icon: 'https://cdn-icons-png.flaticon.com/128/1686/1686815.png',
        category: 'Writing Assistant',
        slug: 'text-improver',
        aiPrompt: 'Given textToImprove, Rewrite text without any grammar mistake and professionally in rich text editor format',
        form: [
            {
                label: 'Enter text that you want to re-write or improve',
                field: 'textarea',
                name: 'textToImprove'
            }
        ]
    },
    
    {
        name: 'Instagram Hash Tag Generator',
        desc: 'An AI tool that generates hashtag for your instagram post.',
        icon: 'https://cdn-icons-png.flaticon.com/128/7045/7045432.png',
        category: 'blog',
       
        slug: 'instagram-hash-tag-generator',
        aiPrompt: 'Generate 15 Instagram hash tag depends on a given keywords and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter Keywords for your instagram hastag',
                field: 'input',
                name: 'keywords',
                required:true
            },
           
        ]
    },
   
    {
        name: 'English Grammer Check',
        desc: 'AI Model to Correct your english grammer by providing the text',
        icon:'https://cdn-icons-png.flaticon.com/128/12596/12596700.png',
        category: 'english',
       
        slug: 'english-grammer-checker',
        aiPrompt: 'Rewrite the inputText by correcting the grammer and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter text to correct the grammer',
                field: 'input',
                name: 'inputText',
                required:true
            },
           
        ]
    },
   
   
   

]