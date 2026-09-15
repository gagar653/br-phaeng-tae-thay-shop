const https = require('https');

const webhookUrl = process.env.DISCORD_WEBHOOK;
if (!webhookUrl) {
    console.error("❌ ไม่พบ DISCORD_WEBHOOK ใน Environment Variables");
    process.exit(1);
}

const messages = [
    "เฮ้ย! ถึงเวลาเล่นเกมแล้วไอ้เวร ลุกขึ้นมาแจกได้แล้ว!",
    "พวกเวรตื่น! เปิดคอมได้แล้ว โดนตบยับแน่ถ้าไม่มาตอนนี้",
    "ได้เวลาเข้าดิสมาเป็นภาระให้กูอีกแล้วไอ้สาด!"
];

const mediaList = [
    "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif",
    "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
];

const randomMsg = messages[Math.floor(Math.random() * messages.length)];
const randomMedia = mediaList[Math.floor(Math.random() * mediaList.length)];

const data = JSON.stringify({
    content: `@everyone ${randomMsg}\n\n🎬 ${randomMedia}`
});

const url = new URL(webhookUrl);
const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = https.request(options, (res) => {
    if (res.statusCode === 204 || res.statusCode === 200) {
        console.log("✅ ส่งมีมเข้า Discord สำเร็จอัตโนมัติผ่าน GitHub Actions!");
    } else {
        console.error(`❌ ส่งไม่สำเร็จ Status Code: ${res.statusCode}`);
    }
});

req.on('error', (error) => {
    console.error('⚠️ เกิดข้อผิดพลาด:', error);
});

req.write(data);
req.end();
