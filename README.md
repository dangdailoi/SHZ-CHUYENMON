# Market Research Dashboard

Dashboard hiển thị nghiên cứu thị trường tiếng Trung tại khu vực Đông Nam Bộ.

## 🚀 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

## 📦 Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Build cho production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🌐 Deploy lên Vercel

### Cách 1: Deploy qua Vercel CLI

1. Cài đặt Vercel CLI:
```bash
npm i -g vercel
```

2. Đăng nhập Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Deploy production:
```bash
vercel --prod
```

### Cách 2: Deploy qua GitHub

1. Đẩy code lên GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Kết nối với Vercel:
   - Truy cập [vercel.com](https://vercel.com)
   - Đăng nhập và chọn "New Project"
   - Import repository từ GitHub
   - Vercel sẽ tự động detect Vite và cấu hình
   - Click "Deploy"

### Cách 3: Deploy trực tiếp từ thư mục

1. Kéo thả thư mục project vào [vercel.com/dashboard](https://vercel.com/dashboard)
2. Vercel sẽ tự động build và deploy

## 📁 Cấu trúc Project

```
.
├── src/
│   ├── components/
│   │   └── MarketResearchDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── vercel.json
```

## ⚙️ Cấu hình

- **Vite**: Cấu hình trong `vite.config.js`
- **Tailwind**: Cấu hình trong `tailwind.config.js`
- **Vercel**: Cấu hình trong `vercel.json` (đã được tự động detect)

## 📝 Notes

- Project sử dụng Vite nên build output sẽ nằm trong thư mục `dist/`
- Vercel sẽ tự động detect Vite framework và cấu hình đúng
- Không cần cấu hình thêm, chỉ cần push code lên và deploy

## 🔗 Links

- [Vite Documentation](https://vitejs.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)

