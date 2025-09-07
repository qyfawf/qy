// 缘分测试问卷交互脚本
document.addEventListener('DOMContentLoaded', function() {
    
    // 测试问题数据
    const questions = [
        {
            id: 1,
            question: "你最喜欢的周末活动是什么？",
            options: [
                { text: "在家看书看电影", icon: "📚", value: "introvert" },
                { text: "和朋友聚会聊天", icon: "👥", value: "social" },
                { text: "户外运动健身", icon: "🏃‍♀️", value: "active" },
                { text: "逛街购物美食", icon: "🛍️", value: "lifestyle" }
            ]
        },
        {
            id: 2,
            question: "你理想中的约会方式是？",
            options: [
                { text: "安静的咖啡馆聊天", icon: "☕", value: "quiet" },
                { text: "浪漫的晚餐", icon: "🍽️", value: "romantic" },
                { text: "一起看电影演出", icon: "🎬", value: "entertainment" },
                { text: "户外探险旅行", icon: "🏔️", value: "adventure" }
            ]
        },
        {
            id: 3,
            question: "你更看重伴侣的哪个特质？",
            options: [
                { text: "温柔体贴", icon: "💕", value: "gentle" },
                { text: "聪明睿智", icon: "🧠", value: "intelligent" },
                { text: "幽默风趣", icon: "😄", value: "funny" },
                { text: "稳重可靠", icon: "🛡️", value: "reliable" }
            ]
        },
        {
            id: 4,
            question: "你的性格更偏向于？",
            options: [
                { text: "内向安静", icon: "🤔", value: "introverted" },
                { text: "外向活泼", icon: "😊", value: "extroverted" },
                { text: "理性思考", icon: "🎯", value: "rational" },
                { text: "感性随性", icon: "🌸", value: "emotional" }
            ]
        },
        {
            id: 5,
            question: "你对未来生活的规划是？",
            options: [
                { text: "事业为重", icon: "💼", value: "career" },
                { text: "家庭第一", icon: "🏠", value: "family" },
                { text: "平衡发展", icon: "⚖️", value: "balanced" },
                { text: "自由自在", icon: "🦋", value: "freedom" }
            ]
        },
        {
            id: 6,
            question: "你喜欢的音乐类型是？",
            options: [
                { text: "古典轻音乐", icon: "🎼", value: "classical" },
                { text: "流行歌曲", icon: "🎵", value: "pop" },
                { text: "摇滚民谣", icon: "🎸", value: "rock" },
                { text: "电子舞曲", icon: "🎧", value: "electronic" }
            ]
        },
        {
            id: 7,
            question: "你的消费观念是？",
            options: [
                { text: "精打细算", icon: "💰", value: "frugal" },
                { text: "适度消费", icon: "💳", value: "moderate" },
                { text: "享受生活", icon: "🛍️", value: "enjoy" },
                { text: "投资未来", icon: "📈", value: "investment" }
            ]
        },
        {
            id: 8,
            question: "你喜欢的宠物是？",
            options: [
                { text: "猫咪", icon: "🐱", value: "cat" },
                { text: "狗狗", icon: "🐶", value: "dog" },
                { text: "都不喜欢", icon: "🌿", value: "none" },
                { text: "都喜欢", icon: "💕", value: "both" }
            ]
        },
        {
            id: 9,
            question: "你的作息习惯是？",
            options: [
                { text: "早睡早起", icon: "🌅", value: "early" },
                { text: "夜猫子", icon: "🌙", value: "night" },
                { text: "规律作息", icon: "⏰", value: "regular" },
                { text: "随心所欲", icon: "🎪", value: "flexible" }
            ]
        },
        {
            id: 10,
            question: "你希望的感情状态是？",
            options: [
                { text: "细水长流", icon: "💧", value: "steady" },
                { text: "轰轰烈烈", icon: "🔥", value: "passionate" },
                { text: "相濡以沫", icon: "🤝", value: "supportive" },
                { text: "自由独立", icon: "🦅", value: "independent" }
            ]
        }
    ];
    
    // 全局变量
    let currentQuestionIndex = 0;
    let answers = {};
    let isTransitioning = false;
    
    // DOM元素
    const questionCard = document.getElementById('questionCard');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const progressPath = document.querySelector('.progress-path');
    const matchingOverlay = document.getElementById('matchingOverlay');
    const resultContainer = document.getElementById('resultContainer');
    
    // 初始化
    function init() {
        totalQuestionsSpan.textContent = questions.length;
        showQuestion(0);
        updateProgress();
        bindEvents();
        
        // 页面加载动画
        setTimeout(() => {
            document.querySelector('.quiz-background').style.animation = 'fadeIn 1s ease-out';
        }, 100);
    }
    
    // 绑定事件
    function bindEvents() {
        prevBtn.addEventListener('click', () => previousQuestion());
        nextBtn.addEventListener('click', () => nextQuestion());
        submitBtn.addEventListener('click', () => submitQuiz());
        
        // 键盘导航
        document.addEventListener('keydown', (e) => {
            if (isTransitioning) return;
            
            if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
                previousQuestion();
            } else if (e.key === 'ArrowRight' && currentQuestionIndex < questions.length - 1) {
                if (answers[currentQuestionIndex]) {
                    nextQuestion();
                }
            }
        });
    }
    
    // 显示问题
    function showQuestion(index) {
        if (index < 0 || index >= questions.length) return;
        
        const question = questions[index];
        const isCurrent = index === currentQuestionIndex;
        
        questionCard.innerHTML = `
            <h2 class="question-title">${question.question}</h2>
            <div class="options-container">
                ${question.options.map((option, optionIndex) => `
                    <div class="option-card ${answers[index] === option.value ? 'selected' : ''}" 
                         data-value="${option.value}"
                         data-index="${optionIndex}">
                        <span class="option-icon">${option.icon}</span>
                        <span class="option-text">${option.text}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        // 绑定选项点击事件
        const optionCards = questionCard.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', () => selectOption(card));
        });
        
        // 更新按钮状态
        updateNavigationButtons();
        
        // 添加进入动画
        if (isCurrent) {
            questionCard.style.animation = 'slideUp 0.8s ease-out';
        }
    }
    
    // 选择选项
    function selectOption(card) {
        if (isTransitioning) return;
        
        const value = card.dataset.value;
        const questionIndex = currentQuestionIndex;
        
        // 移除其他选项的选中状态
        const allCards = questionCard.querySelectorAll('.option-card');
        allCards.forEach(c => c.classList.remove('selected'));
        
        // 添加选中状态
        card.classList.add('selected');
        
        // 保存答案
        answers[questionIndex] = value;
        
        // 创建水波扩散效果
        createRipple(card, event);
        
        // 更新按钮状态
        updateNavigationButtons();
        
        // 自动进入下一题（可选）
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestion();
            }
        }, 500);
    }
    
    // 创建水波扩散效果
    function createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // 上一题
    function previousQuestion() {
        if (isTransitioning || currentQuestionIndex <= 0) return;
        
        isTransitioning = true;
        
        // 添加退出动画
        questionCard.classList.add('slide-out-left');
        
        setTimeout(() => {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
            updateProgress();
            questionCard.classList.remove('slide-out-left');
            questionCard.classList.add('slide-in-right');
            
            setTimeout(() => {
                questionCard.classList.remove('slide-in-right');
                isTransitioning = false;
            }, 500);
        }, 500);
    }
    
    // 下一题
    function nextQuestion() {
        if (isTransitioning || currentQuestionIndex >= questions.length - 1) return;
        
        if (!answers[currentQuestionIndex]) {
            showMessage('请选择一个选项');
            return;
        }
        
        isTransitioning = true;
        
        // 添加退出动画
        questionCard.classList.add('slide-out-left');
        
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
            updateProgress();
            questionCard.classList.remove('slide-out-left');
            questionCard.classList.add('slide-in-right');
            
            setTimeout(() => {
                questionCard.classList.remove('slide-in-right');
                isTransitioning = false;
            }, 500);
        }, 500);
    }
    
    // 更新导航按钮状态
    function updateNavigationButtons() {
        const hasAnswer = answers[currentQuestionIndex];
        
        // 上一题按钮
        prevBtn.style.display = currentQuestionIndex > 0 ? 'block' : 'none';
        
        // 下一题按钮
        if (currentQuestionIndex < questions.length - 1) {
            nextBtn.style.display = 'block';
            nextBtn.disabled = !hasAnswer;
            submitBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            submitBtn.disabled = !hasAnswer;
        }
    }
    
    // 更新进度条
    function updateProgress() {
        const progress = (currentQuestionIndex + 1) / questions.length;
        const offset = 400 - (progress * 400);
        
        progressPath.style.strokeDashoffset = offset;
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
        
        // 添加进度条动画
        progressPath.style.transition = 'stroke-dashoffset 0.5s ease';
    }
    
    // 提交问卷
    function submitQuiz() {
        if (isTransitioning) return;
        
        if (!answers[currentQuestionIndex]) {
            showMessage('请选择一个选项');
            return;
        }
        
        isTransitioning = true;
        
        // 显示匹配中动画
        matchingOverlay.classList.add('active');
        
        // 模拟匹配过程
        setTimeout(() => {
            showResult();
        }, 3000);
    }
    
    // 显示结果
    function showResult() {
        matchingOverlay.classList.remove('active');
        resultContainer.classList.add('active');
        
        // 分析结果
        const result = analyzeResult();
        displayResult(result);
    }
    
    // 分析测试结果
    function analyzeResult() {
        const personalityTypes = {
            gentle_romantic: { name: '温柔浪漫型', percentage: 85 },
            steady_reliable: { name: '稳重成熟型', percentage: 78 },
            active_adventurous: { name: '活力冒险型', percentage: 82 },
            intellectual_calm: { name: '知性安静型', percentage: 75 },
            social_enthusiastic: { name: '社交热情型', percentage: 80 }
        };
        
        // 简单的结果分析逻辑
        const answerValues = Object.values(answers);
        const personalityCount = {};
        
        answerValues.forEach(value => {
            if (value.includes('introvert') || value.includes('quiet') || value.includes('classical')) {
                personalityCount.intellectual_calm = (personalityCount.intellectual_calm || 0) + 1;
            } else if (value.includes('gentle') || value.includes('romantic') || value.includes('emotional')) {
                personalityCount.gentle_romantic = (personalityCount.gentle_romantic || 0) + 1;
            } else if (value.includes('active') || value.includes('adventure') || value.includes('extroverted')) {
                personalityCount.active_adventurous = (personalityCount.active_adventurous || 0) + 1;
            } else if (value.includes('reliable') || value.includes('steady') || value.includes('rational')) {
                personalityCount.steady_reliable = (personalityCount.steady_reliable || 0) + 1;
            } else {
                personalityCount.social_enthusiastic = (personalityCount.social_enthusiastic || 0) + 1;
            }
        });
        
        // 找到最多的类型
        const maxType = Object.keys(personalityCount).reduce((a, b) => 
            personalityCount[a] > personalityCount[b] ? a : b
        );
        
        return {
            personality: personalityTypes[maxType],
            match: personalityTypes[Object.keys(personalityTypes).filter(t => t !== maxType)[0]]
        };
    }
    
    // 显示结果
    function displayResult(result) {
        const personalityType = document.querySelector('.personality-type');
        const matchType = document.querySelector('.match-type');
        const percentageText = document.querySelector('.percentage-text');
        
        personalityType.textContent = result.personality.name;
        matchType.textContent = result.match.name;
        percentageText.textContent = result.personality.percentage + '%';
        
        // 更新百分比圆环
        const percentageCircle = document.querySelector('.percentage-circle');
        const degree = (result.personality.percentage / 100) * 360;
        percentageCircle.style.background = `conic-gradient(var(--primary-pink) 0deg, var(--primary-pink) ${degree}deg, var(--light-pink-bg) ${degree}deg)`;
    }
    
    // 显示消息
    function showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-toast';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary-pink);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 500;
            z-index: 5000;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 2000);
    }
    
    // 添加淡入淡出动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // 初始化应用
    init();
    
    console.log('缘分测试问卷已加载完成！');
});