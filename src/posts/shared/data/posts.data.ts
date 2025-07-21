export interface PostData {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  thumbnailURL: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  lastReadAt: string;
}

export const posts: PostData[] = [
  {
    id: "p1",
    title: "React Hook Form với Zod cực xịn",
    content:
      "Bài viết này hướng dẫn cách dùng Zod để validate form trong React...",
    authorId: "a1",
    authorName: "Doris Nguyễn",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categoryId: "c1",
    categoryName: "Technology",
    createdAt: "2025-07-01T10:00:00Z",
    lastReadAt: "2025-07-15T12:00:00Z",
  },
  {
    id: "p2",
    title: "Tối giản cuộc sống với thói quen buổi sáng",
    content: "Một buổi sáng đơn giản giúp bạn khởi đầu ngày mới hiệu quả...",
    authorId: "a2",
    authorName: "Minh Trí",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categoryId: "c2",
    categoryName: "Lifestyle",
    createdAt: "2025-06-21T08:30:00Z",
    lastReadAt: "2025-07-10T14:20:00Z",
  },
  {
    id: "p3",
    title: "Tập thể dục như thế nào để duy trì năng lượng cả ngày",
    content:
      "Một bài tập nhẹ nhàng mỗi sáng giúp bạn tỉnh táo hơn suốt ngày...",
    authorId: "a3",
    authorName: "Hà Vy",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categoryId: "c3",
    categoryName: "Health",
    createdAt: "2025-05-30T06:45:00Z",
    lastReadAt: "2025-07-12T11:00:00Z",
  },
  {
    id: "p4",
    title: "Tương lai của lập trình viên frontend",
    content: "Frontend sẽ đi về đâu trong thời đại AI và low-code?",
    authorId: "a1",
    authorName: "Doris Nguyễn",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categoryId: "c1",
    categoryName: "Technology",
    createdAt: "2025-07-05T09:10:00Z",
    lastReadAt: "2025-07-15T12:15:00Z",
  },
  {
    id: "p5",
    title: "Thiền định 5 phút mỗi ngày để tăng năng suất",
    content:
      "Thiền không chỉ để thư giãn mà còn giúp bạn làm việc hiệu quả hơn...",
    authorId: "a2",
    authorName: "Minh Trí",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categoryId: "c2",
    categoryName: "Lifestyle",
    createdAt: "2025-06-18T07:00:00Z",
    lastReadAt: "2025-07-14T13:30:00Z",
  },
  {
    id: "p6",
    title: "Dinh dưỡng cơ bản cho dân văn phòng",
    content:
      "Ngồi nhiều, ăn linh tinh? Đọc bài này để cải thiện chế độ ăn ngay!",
    authorId: "a3",
    authorName: "Hà Vy",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categoryId: "c3",
    categoryName: "Health",
    createdAt: "2025-06-10T10:00:00Z",
    lastReadAt: "2025-07-10T16:00:00Z",
  },
];
