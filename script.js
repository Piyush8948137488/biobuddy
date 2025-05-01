// Bio templates for different platforms and tones
const bioTemplates = {
    instagram: {
        professional: [
            "📱 {profession} with a passion for {interests} | Building the future one project at a time",
            "🚀 {profession} • {interests} enthusiast • Always learning, always growing",
            "💼 Crafting solutions in {profession} | Exploring {interests} | Let's connect!"
        ],
        funny: [
            "🎭 {profession} by day, {interests} ninja by night | Professional coffee drinker",
            "🎪 Making {profession} fun again! | {interests} addict | Warning: May talk about memes",
            "🎯 {profession} who's serious about {interests} (and pizza) | Yes, I speak fluent GIF"
        ],
        friendly: [
            "✨ {profession} sharing thoughts on {interests} | Let's be friends!",
            "🌟 Creating magic through {profession} | Love everything about {interests}",
            "🌈 {profession} with a smile | Passionate about {interests} | DMs open for chat"
        ],
        romantic: [
            "💫 {profession} with a heart full of {interests} | Looking for my soulmate",
            "🌹 {profession} who believes in love & {interests} | Here to find my perfect match",
            "💝 {profession} seeking someone to share {interests} and life with"
        ]
    },
    linkedin: {
        professional: [
            "Experienced {profession} with a focus on {interests}. Driving innovation and growth through strategic solutions.",
            "Results-driven {profession} passionate about {interests}. Committed to excellence and continuous improvement.",
            "{profession} specializing in {interests}. Helping organizations achieve their goals through innovative approaches."
        ],
        friendly: [
            "Enthusiastic {profession} who loves {interests}. Always eager to connect with like-minded professionals!",
            "Creative {profession} exploring the world of {interests}. Let's connect and share ideas!",
            "Passionate {profession} with a keen interest in {interests}. Open to new opportunities and collaborations."
        ]
    },
    freelance: {
        professional: [
            "Expert {profession} specializing in {interests} | Available for projects",
            "Trusted {profession} delivering quality solutions in {interests} | 5+ years experience",
            "Independent {profession} focused on {interests} | Let's bring your vision to life"
        ],
        friendly: [
            "Creative {profession} who loves {interests} | Making your ideas reality",
            "Friendly {profession} here to help with {interests} | Let's create something amazing",
            "{profession} with a passion for {interests} | Your project partner"
        ]
    },
    dating: {
        romantic: [
            "🌹 {profession} with a passion for {interests} | Looking for genuine connections",
            "💫 {profession} who enjoys {interests} | Here to find something real",
            "💝 {profession} seeking someone to share adventures and {interests} with"
        ],
        funny: [
            "🎭 {profession} who can't live without {interests} (and pizza) | Swipe right if you're ready to laugh",
            "🎪 Warning: {profession} with dad jokes and a love for {interests}",
            "🎯 {profession} seeking partner in crime for {interests} and random adventures"
        ]
    }
};

// Dark mode functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled' || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('darkMode'))) {
        document.documentElement.classList.add('dark');
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', 
            document.documentElement.classList.contains('dark') ? 'enabled' : 'disabled'
        );
    });

    // Bio form submission
    const bioForm = document.getElementById('bioForm');
    const bioResults = document.getElementById('bioResults');
    const generatedBios = document.getElementById('generatedBios');

    bioForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            profession: document.getElementById('profession').value,
            interests: document.getElementById('interests').value,
            platform: document.getElementById('platform').value,
            tone: document.getElementById('tone').value
        };

        // Generate bios
        const bios = generateBios(formData);
        displayBios(bios);

        // Save to localStorage
        saveBiosToLocalStorage(bios);
    });

    // Load last generated bios if they exist
    loadLastBios();
});

// Generate bios based on form data
function generateBios(data) {
    const platform = bioTemplates[data.platform];
    const availableTones = Object.keys(platform);
    const selectedTone = availableTones.includes(data.tone) ? data.tone : availableTones[0];
    
    const templates = platform[selectedTone];
    const bios = templates.map(template => {
        return template
            .replace(/{name}/g, data.name)
            .replace(/{profession}/g, data.profession)
            .replace(/{interests}/g, data.interests);
    });

    return bios;
}

// Display generated bios
function displayBios(bios) {
    bioResults.innerHTML = '';
    generatedBios.classList.remove('hidden');

    bios.forEach((bio, index) => {
        const bioCard = document.createElement('div');
        bioCard.className = 'bio-card animate-fade-in';
        bioCard.style.animationDelay = `${index * 0.2}s`;

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3">
                </path>
            </svg>
        `;
        
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(bio).then(() => {
                showToast('Bio copied to clipboard!');
            });
        });

        bioCard.innerHTML = `
            <p class="text-gray-900 dark:text-white text-lg">${bio}</p>
        `;
        
        bioCard.appendChild(copyButton);
        bioResults.appendChild(bioCard);
    });

    // Scroll to results
    generatedBios.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Save bios to localStorage
function saveBiosToLocalStorage(bios) {
    localStorage.setItem('lastBios', JSON.stringify(bios));
}

// Load last generated bios
function loadLastBios() {
    const lastBios = localStorage.getItem('lastBios');
    if (lastBios) {
        const bios = JSON.parse(lastBios);
        displayBios(bios);
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger reflow to enable transition
    toast.offsetHeight;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
} 