export interface PostDto {  // ❶ 게시글의 타입을 인터페이스로 정의 
    id: string;
    title: string;
    content: string;
    name: string;
    createdDt: Date;
    updatedDt?: Date;  // ❷ 수정 일시는 필수가 아님
  }
  