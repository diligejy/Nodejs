import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
  } from '@nestjs/websockets';
  
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({ namespace: 'chat' }) // ❶ 네임스페이스 추가
  export class ChatGateway {
    @WebSocketServer() server: Server; // ❷ 웹소켓 서버 인스턴스 선언
  
    @SubscribeMessage('message') // ❸ message 이벤트를 구독 
    handleMessage(socket: Socket, data: any): void {
      // ❹ 접속한 클라이언트들에 메시지 전송
      const { message, nickname } = data; // ❶ 메시지와 닉네임을 데이터에서 추출
      // ❷ 닉네임을 포함한 메시지 전송 
      socket.broadcast.emit('message', `${nickname}: ${message}`); 
      }
  }
  @WebSocketGateway({ namespace: 'room' }) // ❶ room 네임스페이스 사용하는 게이트웨이
export class RoomGateway {
    constructor(private readonly chatGateway: ChatGateway) {} // ❶ 채팅 게이트웨이 의존성 주입
  rooms = [];

  @WebSocketServer()  // ❷ 서버 인스턴스 접근을 위한 변수 선언
  server: Server;

  @SubscribeMessage('createRoom') // ❸ createRoom 핸들러 메서드
  handleMessage(@MessageBody() data) { // ❹ 소켓 없이 데이터만 받음 
    const { nickname, room } = data; 
    this.chatGateway.server.emit('notice', { // ❷ 방 생성 시 이벤트 발생시켜 클라이언트에 송신
        message: `${nickname}님이 ${room}방을 만들었습니다. `,
      });
 
    this.rooms.push(room); // ❺ 채팅방 정보 받아서 추가
    this.server.emit('rooms', this.rooms); // ❻ rooms 이벤트로 채팅방 리스트 전송 
  }
  @SubscribeMessage('joinRoom')            // ❸ 방입장 시 실행되는 핸들러 메서드
  handleJoinRoom(socket: Socket, data) {
    const { nickname, room, toLeaveRoom } = data;
    socket.leave(toLeaveRoom);                 // ❹ 기존의 방에서 먼저 나간다 
     this.chatGateway.server.emit('notice', { // ❺ 공지 이벤트 발생
       message: `${nickname}님이 ${room}방에 입장했습니다. `, 
     });
    socket.join(room);         // ❻ 새로운 방에 입장
  }
  @SubscribeMessage('message')
  handleMessageToRoom(socket: Socket, data) {
    const { nickname, room, message } = data;
    console.log(data);
    socket.broadcast.to(room).emit('message', {  // ❷ 나 이외의 사람에게 데이터 전송 
      message: `${nickname}: ${message}`,
    });
  }

}
