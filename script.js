// 缘中缘婚介中心 - 交互脚本
document.addEventListener('DOMContentLoaded', function() {
    
    // 初始化所有组件
    initNavbar();
    initHamburgerMenu();
    initScrollAnimations();
    
    // 模拟会员数据
    const membersData = [
        { name: '张小明', age: 28, interests: ['摄影', '旅行', '美食'], photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI4MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZCNkIxIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiPuiuvui9rTwvdGV4dD4KPC9zdmc+' },
        { name: '李小红', age: 26, interests: ['阅读', '瑜伽', '音乐'], photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI4MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRERBMEREIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiPuiuvui9rTwvdGV4dD4KPC9zdmc+' },
        { name: '王小华', age: 30, interests: ['运动', '电影', '烹饪'], photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI4MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBENjhDIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiPuiuvui9rTwvdGV4dD4KPC9zdmc+' },
        { name: '刘小芳', age: 27, interests: ['绘画', '舞蹈', '茶艺'], photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI4MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjAwIiBmaWxsPSIjQjBDNERFIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiPuiuvui9rTwvdGV4dD4KPC9zdmc+' }
    ];
    
    // 模拟成功案例数据
    const successData = [
        { 
            title: '相识3个月，步入订婚', 
            description: '通过缘中缘的精准匹配，他们在第一次见面就找到了共同语言，三个月后决定共度一生。',
            photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDgwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZCNkIxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiPuiuvueUuOS6jOWkluWIl+ihqDwvdGV4dD4KPC9zdmc+' 
        },
        { 
            title: '异地恋修成正果', 
            description: '虽然相隔两地，但我们的专业顾问帮助他们克服了距离障碍，现在已幸福结婚。',
            photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDgwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRERBMEREIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiPua3u+WKoOWbvueJhzwvdGV4dD4KPC9zdmc+' 
        }
    ];
    
    // 汉堡菜单功能
    function initHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // 点击菜单项后关闭菜单
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
            
            // 点击菜单外部关闭菜单
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    }
    
    // 导航栏滚动效果
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // 平滑滚动
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // 初始化会员展示区
    function initMembersSection() {
        const membersScroll = document.querySelector('.members-scroll');
        if (!membersScroll) return;
        
        // 创建会员卡片
        membersData.forEach((member, index) => {
            const card = createMemberCard(member, index);
            membersScroll.appendChild(card);
        });
        
        // 自动滚动效果
        let scrollAmount = 0;
        let scrollDirection = 1;
        let isAutoScrolling = true;
        
        function autoScroll() {
            if (!isAutoScrolling) return;
            
            scrollAmount += scrollDirection * 0.5;
            
            if (scrollAmount >= membersScroll.scrollWidth - membersScroll.clientWidth) {
                scrollDirection = -1;
            } else if (scrollAmount <= 0) {
                scrollDirection = 1;
            }
            
            membersScroll.scrollLeft = scrollAmount;
            requestAnimationFrame(autoScroll);
        }
        
        // 鼠标悬停暂停滚动
        membersScroll.addEventListener('mouseenter', () => {
            isAutoScrolling = false;
        });
        
        membersScroll.addEventListener('mouseleave', () => {
            isAutoScrolling = true;
            autoScroll();
        });
        
        // 启动自动滚动
        autoScroll();
    }
    
    // 创建会员卡片
    function createMemberCard(member, index) {
        const card = document.createElement('div');
        card.className = 'member-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <img src="${member.photo}" alt="${member.name}" class="member-photo">
            <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-age">${member.age}岁</p>
                <div class="member-interests">
                    ${member.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
                </div>
            </div>
        `;
        
        // 点击放大效果
        card.addEventListener('click', function() {
            showMemberModal(member);
        });
        
        return card;
    }
    
    // 初始化成功案例
    function initSuccessStories() {
        const successStories = document.querySelector('.success-stories');
        if (!successStories) return;
        
        successData.forEach((story, index) => {
            const card = createSuccessCard(story, index);
            successStories.appendChild(card);
        });
        
        // 翻书效果
        let currentIndex = 0;
        const cards = successStories.querySelectorAll('.success-card');
        
        function updateCards() {
            cards.forEach((card, index) => {
                card.classList.remove('active', 'prev', 'next');
                
                if (index === currentIndex) {
                    card.classList.add('active');
                } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                    card.classList.add('prev');
                } else if (index === (currentIndex + 1) % cards.length) {
                    card.classList.add('next');
                }
            });
        }
        
        updateCards();
        
        // 自动切换
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCards();
        }, 4000);
        
        // 点击切换
        cards.forEach((card, index) => {
            card.addEventListener('click', function() {
                currentIndex = index;
                updateCards();
            });
        });
    }
    
    // 创建成功案例卡片
    function createSuccessCard(story, index) {
        const card = document.createElement('div');
        card.className = 'success-card fade-in';
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.innerHTML = `
            <img src="${story.photo}" alt="${story.title}" class="success-photo">
            <div class="success-content">
                <h3 class="success-title">${story.title}</h3>
                <p class="success-description">${story.description}</p>
            </div>
        `;
        
        return card;
    }
    
    // 会员详情模态框
    function showMemberModal(member) {
        const modal = document.createElement('div');
        modal.className = 'member-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img src="${member.photo}" alt="${member.name}" class="modal-photo">
                    <h2>${member.name}</h2>
                    <p>年龄：${member.age}岁</p>
                    <p>兴趣爱好：${member.interests.join('、')}</p>
                    <a href="quiz.html" class="cta-button">联系TA</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 关闭模态框
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        overlay.addEventListener('click', () => {
            modal.remove();
        });
        
        // 添加模态框样式
        const style = document.createElement('style');
        style.textContent = `
            .member-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                padding: 2rem;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .modal-close {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
            }
            
            .modal-photo {
                width: 200px;
                height: 200px;
                object-fit: cover;
                border-radius: 50%;
                margin-bottom: 1rem;
            }
            
            .modal-content h2 {
                color: var(--primary-pink);
                margin-bottom: 1rem;
            }
            
            .modal-content p {
                color: var(--text-light);
                margin-bottom: 0.5rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 滚动动画
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
    
    // 初始化各个部分
    initMembersSection();
    initSuccessStories();
    
    console.log('缘中缘婚介中心网站已加载完成！');
});