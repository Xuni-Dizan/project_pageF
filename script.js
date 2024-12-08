// scripts.js

// document.addEventListener('DOMContentLoaded', () => {
//     // Hiệu ứng xuất hiện khi cuộn trang
//     const dishes = document.querySelectorAll('.dish');
//     const regionalFlavors = document.querySelector('.regional-flavors');
    
//     window.addEventListener('scroll', () => {
//       dishes.forEach(dish => {
//         const position = dish.getBoundingClientRect().top;
//         if (position < window.innerHeight - 100) {
//           dish.classList.add('active');
//         }
//       });
  
//       const regionPosition = regionalFlavors.getBoundingClientRect().top;
//       if (regionPosition < window.innerHeight - 150) {
//         regionalFlavors.classList.add('active');
//       }
//     });
//   });

  // scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Hiệu ứng xuất hiện khi cuộn trang
    const elements = document.querySelectorAll('.animated');
    
    window.addEventListener('scroll', () => {
      elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
          element.classList.add('fadeIn');
        }
      });
    });
  });

  
//   async function fetchTime() {
//     const url = 'http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh';
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data && data.datetime) {
//       const time = new Date(data.datetime).toLocaleString();
//       document.getElementById('time-info').innerHTML = `Thời gian hiện tại: ${time}`;
//     } else {
//       document.getElementById('time-info').innerHTML = "Không thể lấy dữ liệu thời gian.";
//     }
//   }
//   fetchTime();

//   // Khi người dùng cuộn trang, kiểm tra vị trí của h2
// window.addEventListener('scroll', function() {
//   const sidebar = document.querySelector('.sidebar');
//   const h2 = document.querySelector('#sidebar-title');
//   const lists = sidebar.querySelectorAll('ul ul');
//   const h2Bottom = h2.getBoundingClientRect().bottom; // Lấy vị trí dưới cùng của h2
  
//   // Kiểm tra nếu các ul con vượt qua border-bottom của h2
//   lists.forEach((ul) => {
//       const ulTop = ul.getBoundingClientRect().top;
      
//       if (ulTop < h2Bottom) {
//           ul.style.display = 'none'; // Ẩn ul khi qua border-bottom của h2
//       } else {
//           ul.style.display = 'block'; // Hiển thị lại ul khi chưa qua border-bottom
//       }
//   });
// });

async function fetchTime() {
  const url = 'http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh';

  try {
    const response = await fetch(url);

    // Kiểm tra xem phản hồi có thành công (HTTP status code 200) hay không
    if (!response.ok) {
      throw new Error('Không thể truy cập API, mã lỗi: ' + response.status);
    }

    const data = await response.json();

    // Kiểm tra nếu dữ liệu hợp lệ
    if (data && data.datetime) {
      const time = new Date(data.datetime).toLocaleString();
      document.getElementById('time-info').innerHTML = `Thời gian hiện tại: ${time}`;
    } else {
      document.getElementById('time-info').innerHTML = "Không thể lấy dữ liệu thời gian.";
    }
  } catch (error) {
    // Xử lý lỗi nếu fetch thất bại
    document.getElementById('time-info').innerHTML = `Lỗi: ${error.message}`;
  }
}

fetchTime();

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector('.sidebar');
    const navbar = document.querySelector('nav');
    const timeCard = document.getElementById('time');
    const footer = document.querySelector('footer');

    // Lấy vị trí ban đầu của sidebar và timeCard
    const sidebarOriginalOffset = sidebar.offsetTop;
    // Lấy vị trí chính xác của timeCard
    const timeRect = timeCard.getBoundingClientRect();
    const timeOriginalOffset = timeRect.top + window.scrollY;

    // Lấy chiều cao của các phần tử
    const navHeight = navbar.offsetHeight
    const sidebarHeight = sidebar.offsetHeight;
    const timeHeight = timeCard.offsetHeight;

    // Khoảng cách cách footer khi dừng
    const marginOffset = 60; // Khoảng cách cách footer (px)

    // Đảm bảo rằng tất cả các mục li trong sidebar luôn được hiển thị
    const lists = sidebar.querySelectorAll('ul ul');
    lists.forEach((ul) => {
        ul.style.display = 'block'; // Đảm bảo rằng tất cả các ul con luôn được hiển thị
    });

    // Lắng nghe sự kiện cuộn trang
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;  // Vị trí hiện tại của trang khi cuộn
        const footerTop = footer.getBoundingClientRect().top + scrollY; // Vị trí của footer so với trang

        // 1. Sticky cho sidebar và timeCard khi cuộn xuống
        if (scrollY >= sidebarOriginalOffset && scrollY + sidebarHeight + timeHeight + marginOffset + navHeight< footerTop) {
          sidebar.style.position = 'fixed';
          sidebar.style.top = `${navHeight}px`; // Sidebar cách đỉnh viewport một khoảng

          timeCard.style.position = 'fixed';
          timeCard.style.top = `${sidebarHeight}px`; // TimeCard nằm ngay dưới sidebar
      }
      // 2. Khi chạm footer, sidebar và timeCard dừng lại
      else if (scrollY + sidebarHeight + timeHeight + marginOffset >= footerTop) {
          const distanceToFooter = footerTop - (sidebarHeight + timeHeight + marginOffset);
          sidebar.style.position = 'absolute';
          sidebar.style.top = `${distanceToFooter}px`;

          timeCard.style.position = 'absolute';
          timeCard.style.top = `${distanceToFooter + sidebarHeight + 10}px`; // Đảm bảo timeCard không bị che khuất
      }
      // 3. Khi cuộn lên và chưa tới vị trí ban đầu
      else if (scrollY < sidebarOriginalOffset) {
          sidebar.style.position = 'absolute';
          sidebar.style.top = `${sidebarOriginalOffset}px`;

          timeCard.style.position = 'absolute';
          timeCard.style.top = `${timeOriginalOffset}px`;
      }
    });
});

// Giới hạn tần suất gọi hàm xử lý scroll
let debounceTimer;

window.addEventListener('scroll', function() {
  if (debounceTimer) {
      clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(function() {
      const sidebar = document.querySelector('.sidebar');
      const h2 = document.querySelector('#sidebar-title');
      const lists = sidebar.querySelectorAll('ul ul');
      const h2Bottom = h2.getBoundingClientRect().bottom; // Lấy vị trí dưới cùng của h2

      // Lặp qua các ul con và xử lý
      lists.forEach((ul) => {
          const ulTop = ul.getBoundingClientRect().top;

          // Kiểm tra nếu các ul con vượt qua border-bottom của h2
          if (ulTop < h2Bottom) {
              if (ul.style.display !== 'none') {
                  ul.style.transition = 'transform 0.3s ease-out';
                  ul.style.transform = 'translateY(-20px)';
                  setTimeout(() => {
                      ul.style.display = 'none'; // Ẩn ul khi qua border-bottom của h2
                  }, 300); // Thời gian trễ tương ứng với transition
              }
          } else {
              if (ul.style.display === 'none') {
                  ul.style.display = 'block'; // Hiển thị lại ul khi chưa qua border-bottom
                  ul.style.transform = 'translateY(0)';
              }
          }
      });
  }, 100); // Thời gian debounce (ví dụ 100ms)
});
document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector('.sidebar');
    const lists = sidebar.querySelectorAll('ul ul'); // Chọn tất cả các ul con

    // Tạo một observer để theo dõi các ul con
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Khi ul vào vùng nhìn thấy
                entry.target.style.display = 'block'; // Hiển thị ul
                entry.target.style.transition = 'transform 0.3s ease-out'; // Thêm hiệu ứng mượt mà
                entry.target.style.transform = 'translateY(0)'; // Di chuyển về vị trí ban đầu

                observer.unobserve(entry.target); // Dừng quan sát sau khi ul đã vào vùng nhìn thấy
            } else {
                // Khi ul ra khỏi vùng nhìn thấy
                entry.target.style.transition = 'transform 0.3s ease-out'; // Thêm hiệu ứng mượt mà
                entry.target.style.transform = 'translateY(20px)'; // Di chuyển lên một chút
                entry.target.style.display = 'none'; // Ẩn ul
            }
        });
    }, {
        root: null, // Quan sát vùng nhìn thấy của viewport
        rootMargin: '0px',
        threshold: 0.1 // Quan sát khi ít nhất 10% phần tử vào vùng nhìn thấy
    });

    // Quan sát từng ul con
    lists.forEach((ul) => {
        ul.style.display = 'none'; // Ban đầu ẩn tất cả các ul con
        observer.observe(ul); // Bắt đầu quan sát
    });
});

