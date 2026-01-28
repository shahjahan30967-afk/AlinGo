<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alingo - All In One Go</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* تھیم کے رنگ */
        :root {
            --deep-blue: #004a99;
            --fresh-green: #1eb53a;
        }

        body {
            background-color: #f0f4f8;
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            overflow: hidden;
        }

        /* 1. Splash Screen */
        #splash {
            position: fixed;
            inset: 0;
            background: white;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: opacity 0.8s ease;
        }

        /* 2. Circular Menu Container */
        .disk-wrapper {
            position: relative;
            width: 340px;
            height: 340px;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* بیرونی رنگین ڈسک */
        .outer-disk {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--fresh-green), var(--deep-blue));
            box-shadow: 0 15px 35px rgba(0,74,153,0.3);
            border: 8px solid white;
        }

        /* اندرونی سفید ڈسک */
        .inner-disk {
            position: absolute;
            width: 130px;
            height: 130px;
            background: white;
            border-radius: 50%;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        /* سروس بٹنز جو دائرے پر ہوں گے */
        .service-node {
            position: absolute;
            width: 75px;
            height: 75px;
            background: white;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            cursor: pointer;
            transition: transform 0.2s;
            z-index: 20;
        }

        .service-node:active { transform: scale(0.9); }
        .node-icon { font-size: 24px; }
        .node-text { font-size: 10px; font-weight: bold; color: var(--deep-blue); margin-top: 2px; }
    </style>
</head>
<body class="flex flex-col min-h-screen">

    <div id="splash">
        <img src="/LOGO.JPG" alt="Alingo" class="w-40 h-40 object-contain mb-4">
        <h1 class="text-4xl font-black text-[#004a99] italic">Alingo</h1>
        <p class="text-[#1eb53a] font-bold tracking-widest mt-2">ALL IN ONE GO</p>
    </div>

    <div id="home-content" class="hidden flex-1 flex flex-col items-center justify-center p-4">
        
        <div class="text-center mb-10">
            <h2 class="text-2xl font-extrabold text-[#004a99]">خوش آمدید، Alingo میں!</h2>
            <p class="text-gray-500 text-sm">آپ کی ہر ضرورت، اب ایک ہی جگہ</p>
        </div>

        <div class="disk-wrapper" id="menuRing">
            <div class="outer-disk"></div>
            
            <div class="inner-disk">
                <img src="/LOGO.JPG" alt="Alingo" class="w-24 h-24 object-contain">
            </div>

            </div>

    </div>

    <script>
        // سروسز کی فہرست
        const services = [
            { name: 'ٹیکسی', icon: '🚕' },
            { name: 'کھانا', icon: '🍔' },
            { name: 'گروسری', icon: '🛒' },
            { name: 'ٹکٹنگ', icon: '🎟️' },
            { name: 'ٹریول', icon: '✈️' },
            { name: 'ڈیجیٹل', icon: '🧾' },
            { name: 'شاپنگ', icon: '🛍️' },
            { name: 'سپورٹ', icon: '📞' }
        ];

        function initCircle() {
            const ring = document.getElementById('menuRing');
            const radius = 135; // دائرے کا سائز
            const total = services.length;

            services.forEach((s, i) => {
                const angle = (i * 360 / total) * (Math.PI / 180);
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                const node = document.createElement('div');
                node.className = 'service-node';
                node.style.left = `calc(50% + ${x}px - 37.5px)`;
                node.style.top = `calc(50% + ${y}px - 37.5px)`;
                
                node.innerHTML = `
                    <span class="node-icon">${s.icon}</span>
                    <span class="node-text">${s.name}</span>
                `;
                
                node.onclick = () => alert(s.name + " سروس جلد دستیاب ہوگی۔");
                ring.appendChild(node);
            });
        }

        // سپلیش ٹائمر
        window.onload = () => {
            setTimeout(() => {
                const sp = document.getElementById('splash');
                sp.style.opacity = '0';
                setTimeout(() => {
                    sp.style.display = 'none';
                    document.getElementById('home-content').classList.remove('hidden');
                    initCircle();
                }, 800);
            }, 3000);
        };
    </script>
</body>
</html>
