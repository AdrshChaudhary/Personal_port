var audio=document.getElementById("audioPlayer"),loader=document.getElementById("preloader");function settingtoggle(){document.getElementById("setting-container").classList.toggle("settingactivate"),document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow"),document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow")}function playpause(){!1==document.getElementById("switchforsound").checked?audio.pause():audio.play()}function visualmode(){document.body.classList.toggle("light-mode"),document.querySelectorAll(".needtobeinvert").forEach(function(e){e.classList.toggle("invertapplied")})}window.addEventListener("load",function(){loader.style.display="none",document.querySelector(".hey").classList.add("popup")});let emptyArea=document.getElementById("emptyarea"),mobileTogglemenu=document.getElementById("mobiletogglemenu");function hamburgerMenu(){document.body.classList.toggle("stopscrolling"),document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu"),document.getElementById("burger-bar1").classList.toggle("hamburger-animation1"),document.getElementById("burger-bar2").classList.toggle("hamburger-animation2"),document.getElementById("burger-bar3").classList.toggle("hamburger-animation3")}function hidemenubyli(){document.body.classList.toggle("stopscrolling"),document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu"),document.getElementById("burger-bar1").classList.remove("hamburger-animation1"),document.getElementById("burger-bar2").classList.remove("hamburger-animation2"),document.getElementById("burger-bar3").classList.remove("hamburger-animation3")}const sections=document.querySelectorAll("section"),navLi=document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),mobilenavLi=document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");window.addEventListener("scroll",()=>{let e="";sections.forEach(t=>{let o=t.offsetTop;t.clientHeight,pageYOffset>=o-200&&(e=t.getAttribute("id"))}),mobilenavLi.forEach(t=>{t.classList.remove("activeThismobiletab"),t.classList.contains(e)&&t.classList.add("activeThismobiletab")}),navLi.forEach(t=>{t.classList.remove("activeThistab"),t.classList.contains(e)&&t.classList.add("activeThistab")})}),console.log("%c Designed and Developed by Vinod Jangid ","background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;");let mybutton=document.getElementById("backtotopbutton");function scrollFunction(){document.body.scrollTop>400||document.documentElement.scrollTop>400?mybutton.style.display="block":mybutton.style.display="none"}function scrolltoTopfunction(){document.body.scrollTop=0,document.documentElement.scrollTop=0}window.onscroll=function(){scrollFunction()},document.addEventListener("contextmenu",function(e){"IMG"===e.target.nodeName&&e.preventDefault()},!1);let Pupils=document.getElementsByClassName("footer-pupil"),pupilsArr=Array.from(Pupils),pupilStartPoint=-10,pupilRangeX=20,pupilRangeY=15,mouseXStartPoint=0,mouseXEndPoint=window.innerWidth,currentXPosition=0,fracXValue=0,mouseYEndPoint=window.innerHeight,currentYPosition=0,fracYValue=0,mouseXRange=mouseXEndPoint-mouseXStartPoint;const mouseMove=e=>{fracXValue=(currentXPosition=e.clientX-mouseXStartPoint)/mouseXRange,fracYValue=(currentYPosition=e.clientY)/mouseYEndPoint;let t=pupilStartPoint+fracXValue*pupilRangeX,o=pupilStartPoint+fracYValue*pupilRangeY;pupilsArr.forEach(e=>{e.style.transform=`translate(${t}px, ${o}px)`})},windowResize=e=>{mouseXEndPoint=window.innerWidth,mouseYEndPoint=window.innerHeight,mouseXRange=mouseXEndPoint-mouseXStartPoint};window.addEventListener("mousemove",mouseMove),window.addEventListener("resize",windowResize);

// ===========================
// MEDIUM BLOG RSS INTEGRATION
// ===========================

// Configuration - Replace with your Medium username
const MEDIUM_CONFIG = {
    username: 'im.aadrsh', // Replace with your actual Medium username (e.g., 'aadarshchaudhary')
    maxPosts: 3, // Number of posts to display
    fallbackPosts: [
        // Fallback posts in case RSS fails
        {
            title: "Getting Started with Python for Data Science",
            description: "A comprehensive guide to kickstart your journey in data science with Python. Learn the essential libraries and tools you need to know.",
            link: "https://medium.com/@yourusername/getting-started-with-python-for-data-science",
            pubDate: "2025-01-15",
            categories: ["Python", "Data Science", "Machine Learning"],
            thumbnail: "src/png/blog-preview-1.png"
        },
        {
            title: "Building AI-Powered Web Applications",
            description: "Explore how to integrate AI capabilities into modern web applications using FastAPI, TensorFlow, and React.",
            link: "https://medium.com/@yourusername/building-ai-powered-web-applications",
            pubDate: "2025-01-10",
            categories: ["AI", "Web Development", "FastAPI"],
            thumbnail: "src/png/blog-preview-2.png"
        }
    ]
};

// Function to fetch Medium posts via RSS
async function fetchMediumPosts() {
    const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_CONFIG.username}`;
    
    try {
        console.log('Fetching Medium posts...');
        const response = await fetch(rssUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
            console.log('Successfully fetched Medium posts:', data.items.length);
            displayBlogPosts(data.items.slice(0, MEDIUM_CONFIG.maxPosts));
        } else {
            console.warn('No Medium posts found, using fallback posts');
            displayBlogPosts(MEDIUM_CONFIG.fallbackPosts);
        }
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        console.log('Using fallback posts due to error');
        displayBlogPosts(MEDIUM_CONFIG.fallbackPosts);
    }
}

// Function to clean HTML content from Medium descriptions
function cleanContent(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove images, figures, and other unwanted elements
    const unwantedElements = tempDiv.querySelectorAll('img, figure, iframe, script');
    unwantedElements.forEach(el => el.remove());
    
    // Get text content and limit it
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.substring(0, 150).trim();
}

// Function to extract thumbnail from content
function extractThumbnail(content, fallback = 'src/png/default-blog-image.png') {
    if (!content) return fallback;
    
    const imgRegex = /<img[^>]+src="([^">]+)"/i;
    const match = content.match(imgRegex);
    return match && match[1] ? match[1] : fallback;
}

// Function to display blog posts
function displayBlogPosts(posts) {
    const blogContainer = document.querySelector('.blog-boxes-div');
    
    if (!blogContainer) {
        console.error('Blog container not found. Make sure the blog section HTML is added.');
        return;
    }
    
    // Clear existing content
    blogContainer.innerHTML = '';
    
    posts.forEach((post, index) => {
        const publishDate = new Date(post.pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Clean description
        const description = post.description ? cleanContent(post.description) : post.content ? cleanContent(post.content) : 'Click to read more...';
        
        // Get thumbnail
        const thumbnail = post.thumbnail || extractThumbnail(post.content) || extractThumbnail(post.description) || 'src/png/default-blog-image.png';
        
        // Get categories/tags
        const categories = post.categories || ['Medium', 'Blog'];
        const tags = categories.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('');
        
        const blogPost = `
            <div data-aos="fade-up" data-aos-delay="${index * 100}" class="blog-box-wrapper">
                <div class="blog-box">
                    <div class="blog-info-div">
                        <img src="src/png/medium-logo.png" alt="Medium logo" class="blogPlatformLogo" onerror="this.style.display='none'" />
                        <article class="BlogHeading">${post.title}</article>
                        <span class="blog-date">Published on ${publishDate}</span>
                        <p class="BlogDescription">
                            ${description}${description.length >= 150 ? '...' : ''}
                        </p>
                        <div class="blog-tags">
                            ${tags}
                        </div>
                        <div class="blog-buttons">
                            <a href="${post.link}" target="_blank" class="blog-cta" aria-label="Read on Medium">
                                <span>Read More</span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="blog-image-div">
                        <img src="${thumbnail}" alt="Blog preview image" onerror="this.src='src/png/default-blog-image.png'" />
                    </div>
                </div>
            </div>
        `;
        
        blogContainer.innerHTML += blogPost;
    });
    
    // Add "View All" button
    const viewAllSection = `
        <div class="view-all-blogs" data-aos="fade-up" data-aos-delay="${posts.length * 100}">
            <a href="https://medium.com/@${MEDIUM_CONFIG.username}" target="_blank" class="view-all-cta">
                <span>View All Articles on Medium</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </a>
        </div>
    `;
    
    blogContainer.innerHTML += viewAllSection;
    
    // Reinitialize AOS for new elements
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Function to check if blog section exists and fetch posts
function initializeBlogSection() {
    const blogSection = document.querySelector('#blogs');
    if (blogSection) {
        console.log('Blog section found, fetching Medium posts...');
        fetchMediumPosts();
    } else {
        console.log('Blog section not found. Make sure to add the blog section HTML.');
    }
}

// Initialize blog section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all elements are rendered
    setTimeout(initializeBlogSection, 1000);
});

// Also initialize when window loads (backup)
window.addEventListener('load', function() {
    setTimeout(initializeBlogSection, 2000);
});

// Utility function to retry fetching posts if needed
function retryFetchPosts() {
    const blogContainer = document.querySelector('.blog-boxes-div');
    if (blogContainer && blogContainer.children.length === 0) {
        console.log('Retrying to fetch Medium posts...');
        fetchMediumPosts();
    }
}