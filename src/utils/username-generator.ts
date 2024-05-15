export const usernameGen = (): string => {
    const adjectives = [
        'bright', 'happy', 'curious', 'playful', 'strong', 'clever', 'brave', 'swift', 'gentle', 'mystical', 
        'shimmering', 'enchanted', 'ferocious', 'wise', 'majestic', 'ethereal', 'fiery', 'cunning', 'nimble'
    ]
    const animals = ['lion', 'elephant', 'fox', 'tiger', 'wolf', 'bear', 'deer', 'rabbit', 'squirrel', 'owl',
    'whale', 'dolphin', 'shark', 'octopus', 'seahorse', 'turtle', 'starfish', 'jellyfish', 'penguin', 'sea lion'    
    ];
    
    const firstName = adjectives[Math.floor(Math.random() * adjectives.length)];
    const lastName = animals[Math.floor(Math.random() * adjectives.length)];  

    let username = firstName + ' ' + lastName;

    return username;
}

 