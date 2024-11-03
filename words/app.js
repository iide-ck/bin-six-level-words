let words = [];

document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const content = e.target.result;
      console.log('文件内容:', content); // 调试信息
      const lines = content.split('\n').map(line => line.trim()).filter(line => line !== '');
      words = lines.map(line => line.split(' ')[0].trim()); // 只提取每行的第一个单词
      displayRandomWord();
    };
    reader.onerror = function(error) {
      console.error('读取文件时发生错误:', error);
    };
    reader.readAsText(file, 'UTF-8'); // 指定编码为 UTF-8
  } else {
    document.getElementById('wordDisplay').innerText = '请选择文件以开始';
  }
});

document.getElementById('generateButton').addEventListener('click', function() {
  if (words.length > 0) {
    displayRandomWord();
  } else {
    alert('请先选择文件');
  }
});

function displayRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  document.getElementById('wordDisplay').innerText = randomWord;
}

// 生成气泡
function createBubbles(numBubbles) {
  const bubbleShapes = ['bubble1', 'bubble2', 'bubble3', 'bubble4']; // 添加更多的形状

  for (let i = 0; i < numBubbles; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // 随机位置
    const randomLeft = `${Math.random() * 90 + 5}%`;
    const randomBottom = `${Math.random() * 90 + 5}%`;

    // 随机大小
    const randomSize = `${Math.random() * 50 + 50}px`; // 50px 到 100px 之间

    // 随机动画时间
    const randomRiseDuration = `${Math.random() * 10 + 5}s`;
    const randomChangeOpacityDuration = `${Math.random() * 2 + 1}s`;

    // 随机动画延迟
    const randomRiseDelay = `${Math.random() * 10}s`;
    const randomChangeOpacityDelay = `${Math.random() * 10}s`;

    // 随机选择一个形状
    const randomShape = bubbleShapes[Math.floor(Math.random() * bubbleShapes.length)];

    bubble.style.left = randomLeft;
    bubble.style.bottom = randomBottom;
    bubble.style.width = randomSize;
    bubble.style.height = randomSize;
    bubble.style.animation = `rise ${randomRiseDuration} linear ${randomRiseDelay} infinite, changeOpacity ${randomChangeOpacityDuration} ease-in-out ${randomChangeOpacityDelay} infinite`;

    // 使用 SVG 创建不规则形状的气泡
    const svgBubble = `<svg class="bubble-svg" width="${randomSize}" height="${randomSize}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <use href="#${randomShape}" />
                      </svg>`;
    bubble.innerHTML = svgBubble;

    document.body.appendChild(bubble);

    bubble.addEventListener('click', function() {
      this.classList.add('bubble-clicked');
      setTimeout(() => {
        this.classList.remove('bubble-clicked');
      }, 1000);
    });
  }
}

// 初始化气泡
createBubbles(10); // 生成10个气泡