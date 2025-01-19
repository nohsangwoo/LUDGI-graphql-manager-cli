import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const PING_URL = `http://localhost:${PORT}/api/ping`;

const waitForServerReady = async () => {
  console.log(`🔄 Delaying server check by 2 seconds...`);
  await new Promise(resolve => setTimeout(resolve, 2000)); // 초기 2초 대기

  console.log(`🔄 Checking server status at ${PING_URL}...`);
  while (true) {
    try {
      const response = await fetch(PING_URL);
      if (!response.ok) throw new Error('Server not ready'); // 상태 코드 확인
      const data = await response.text(); // 응답 본문 가져오기
      console.log('response: ', data);
      if (data === 'PONG') {
        console.log('✅ Server is ready!');
        break;
      }
    } catch (error) {
      console.log('❌ Server is not ready yet');
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
  }
};

export default waitForServerReady;
