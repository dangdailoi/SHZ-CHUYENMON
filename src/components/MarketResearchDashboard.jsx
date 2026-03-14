import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, ZAxis } from 'recharts';
import { TrendingUp, Users, Globe, Target, Award, Building2, BarChart3, MapPin, ChevronDown, ChevronRight, Info, ArrowRight, AlertTriangle, CheckCircle, XCircle, Eye, Heart, DollarSign, BookOpen, Clock, GraduationCap, UserCheck, Shield, MessageSquare, Star, TrendingDown, Lightbulb, Zap, Phone, ThumbsUp, ThumbsDown } from 'lucide-react';

// ============================================
// DỮ LIỆU PHÂN TÍCH THỊ TRƯỜNG TIẾNG TRUNG 2025
// Khảo sát 62 trung tâm, 179 khóa học
// Khu vực: TP.HCM, Bình Dương
// ============================================
const priceData = [
  { 
    level: "HSK 1", 
    onlineHCM: 2366379, // TB Online chung
    offlineHCM: 5400000, // TB Offline HCM (từ báo cáo)
    onlineBD: 2366379, 
    offlineBD: 2662235, // TB Offline chung/BD
    min: 500000, 
    max: 9408000 
  },
  { 
    level: "HSK 2", 
    onlineHCM: 2626404, 
    offlineHCM: 5400000, 
    onlineBD: 2626404, 
    offlineBD: 3282609, 
    min: 1000000, 
    max: 9408000 
  },
  { 
    level: "HSK 3", 
    onlineHCM: 3453300, 
    offlineHCM: 5400000, 
    onlineBD: 3453300, 
    offlineBD: 4200887, 
    min: 1500000, 
    max: 7920000 
  },
  { 
    level: "HSK 4", 
    onlineHCM: 8195000, 
    offlineHCM: 6651812, 
    onlineBD: 8195000, 
    offlineBD: 6651812, 
    min: 2400000, 
    max: 14660000 
  },
  { 
    level: "HSK 5", 
    onlineHCM: 11413333, 
    offlineHCM: 17920000, 
    onlineBD: 11413333, 
    offlineBD: 17920000, 
    min: 7680000, 
    max: 17920000 
  }
];
const data = {
  // Tổng quan
  totalCenters: 62,
  totalCourses: 179,
  surveyPeriod: "Q4/2025",
  
  // KPIs quan trọng - GAP = Cơ hội
  kpis: {
    commitment: { value: 46, gap: 54, label: "Có cam kết đầu ra" },
    gvbx: { value: 18, gap: 82, label: "Có GVBX", insight: "GVBX khan hiếm - USP mạnh" },
    hskPrep: { value: 4, gap: 96, label: "Có luyện thi HSK", insight: "GAP LỚN NHẤT - Nhu cầu cao" },
    mockTest: { value: 2, gap: 98, label: "Có thi thử HSK" },
    online: { value: 37, gap: 63, label: "Có lớp Online" },
    record: { value: 7, gap: 93, label: "Có record bài giảng" }
  },
  
  // Phân bố địa lý
  regions: [
    { name: "TP.HCM", centers: 29, courses: 110, percent: 61, avgPrice: 5996020, pricePerHour: 105444, color: "#3b82f6" },
    { name: "Bình Dương", centers: 27, courses: 54, percent: 30, avgPrice: 3000451, pricePerHour: 61746, color: "#f43f5e" },
    { name: "Khác", centers: 6, courses: 15, percent: 9, avgPrice: 3500000, pricePerHour: 75000, color: "#6b7280" }
  ],
  
  // Phân bố khóa học
  courseDistribution: [
    { name: "HSK 1", count: 53, percent: 30, color: "#3b82f6" },
    { name: "HSK 2", count: 32, percent: 18, color: "#60a5fa" },
    { name: "HSK 3", count: 34, percent: 19, color: "#93c5fd" },
    { name: "HSK 4", count: 25, percent: 14, color: "#f59e0b" },
    { name: "HSK 5", count: 9, percent: 5, color: "#f43f5e" },
    { name: "Thiếu nhi", count: 12, percent: 7, color: "#10b981" },
    { name: "Khác", count: 14, percent: 8, color: "#6b7280" }
  ],
  
  // Giá theo cấp độ
  priceByLevel: [
    { level: "HSK 1", online: 3433632, offline: 4200492, min: 800000, max: 30600000 },
    { level: "HSK 2", online: 3672600, offline: 4014703, min: 2000000, max: 10660000 },
    { level: "HSK 3", online: 4862294, offline: 4707412, min: 2500000, max: 10660000 },
    { level: "HSK 4", online: 8323000, offline: 6473846, min: 2400000, max: 15540000 },
    { level: "HSK 5", online: 11476000, offline: 18942333, min: 7680000, max: 20987000 },
    { level: "Thiếu nhi", online: 4800000, offline: 8287250, min: 2090000, max: 26100000 }
  ],
  
  // Giáo trình
  curriculum: [
    { name: "HSK chuẩn", percent: 42, count: 75 },
    { name: "Hán Ngữ", percent: 20, count: 35 },
    { name: "Tự biên soạn", percent: 16, count: 28 },
    { name: "YCT", percent: 3, count: 6 },
    { name: "Boya", percent: 3, count: 6 },
    { name: "301 câu", percent: 2, count: 3 },
    { name: "Khác", percent: 14, count: 26 }
  ],
  
  // Đội ngũ giáo viên
  teachers: {
    types: [
      { name: "GVVN 100%", percent: 87, count: 155 },
      { name: "GVVN + GVBX", percent: 9, count: 17 },
      { name: "GVBX 100%", percent: 2, count: 4 },
      { name: "Chưa rõ", percent: 2, count: 3 }
    ],
    qualifications: [
      { name: "HSK5 + Cử nhân", percent: 27 },
      { name: "Thạc sĩ/Tiến sĩ", percent: 11 },
      { name: "HSK6", percent: 8 },
      { name: "Gốc Hoa", percent: 8 },
      { name: "Chưa rõ", percent: 19 }
    ],
    centersWithGVBX: [
      "CGE-Hoa Ngữ Quốc Tế", "Hán ngữ Trần Kiến", "HOA NGỮ HỘI VIỆT HOA",
      "Newsky", "Ni Hao Ma Mandarin", "Solf", "Tiếng Trung Ni Hao",
      "TT Thầy Hiên", "TT Tiếng Trung HD", "You Can", "Hoa Ngữ KHẢ HÂN"
    ]
  },
  
  // Dịch vụ hỗ trợ
  services: [
    { name: "Kiểm tra định kỳ", percent: 70, type: "standard" },
    { name: "GV hỗ trợ ngoài giờ", percent: 53, type: "standard" },
    { name: "Tài liệu bổ sung", percent: 31, type: "standard" },
    { name: "Hoạt động ngoại khóa", percent: 25, type: "value-add" },
    { name: "Trợ giảng", percent: 20, type: "value-add" },
    { name: "Du học/Tư vấn", percent: 10, type: "premium" },
    { name: "Record bài giảng", percent: 7, type: "premium" },
    { name: "Thi thử HSK", percent: 2, type: "gap" },
    { name: "App học tập", percent: 1, type: "gap" },
    { name: "Phòng nghỉ rộng rãi", percent: 1, type: "gap" }
    ],
  
  // Cam kết đầu ra
  commitments: [
    { name: "Học lại miễn phí", percent: 46 },
    { name: "Không cam kết", percent: 42 },
    { name: "Học lại với trợ giảng", percent: 4 },
    { name: "Khác/Chưa rõ", percent: 8 }
  ],
  
  // Đánh giá tư vấn
  consultationRating: [
    { name: "Trung lập", count: 103, percent: 58, color: "#6b7280" },
    { name: "Tích cực", count: 52, percent: 29, color: "#10b981" },
    { name: "Tiêu cực", count: 24, percent: 13, color: "#f43f5e" }
  ],
  
  // Top trung tâm
  topCenters: {
    byCourses: [
      { name: "CGE-Hoa Ngữ Quốc Tế", courses: 15, region: "HCM", avgPrice: 6595556, hasGVBX: true, hasCommitment: true },
      { name: "Newsky", courses: 9, region: "HCM", avgPrice: 3153889, hasGVBX: true, hasCommitment: true },
      { name: "iChinese", courses: 8, region: "HCM", avgPrice: 4050000, hasGVBX: false, hasCommitment: true },
      { name: "KAI Center", courses: 5, region: "HCM", avgPrice: 9712500, hasGVBX: false, hasCommitment: false },
      { name: "Tiếng Trung Ni Hao", courses: 5, region: "HCM", avgPrice: 4984000, hasGVBX: true, hasCommitment: true }
    ],
    byHighPrice: [
      { name: "Ni Hao Ma Mandarin", avgPrice: 25900000, feature: "100% GVBX, Premium" },
      { name: "Solf", avgPrice: 12664333, feature: "Cao cấp, YCT" },
      { name: "THANHMAIHSK", avgPrice: 10015000, feature: "Cam kết, tư vấn tốt" },
      { name: "KAI Center", avgPrice: 9712500, feature: "CSVC hiện đại" },
      { name: "Tiếng Trung Mỗi Ngày", avgPrice: 8875000, feature: "Cam kết, follow up tốt" }
    ],
    byLowPrice: [
      { name: "Tiếng Trung Kim Tứ Gia", avgPrice: 800000, region: "BD" },
      { name: "TT Hoa Văn Cát Nhiên", avgPrice: 1200000, region: "HCM" },
      { name: "TT Đông Nam Bộ", avgPrice: 1950000, region: "BD" },
      { name: "Hoa Ngữ Anh Đào", avgPrice: 2033333, region: "BD" },
      { name: "Hoa Ngữ Lê Trường", avgPrice: 2100000, region: "BD" }
    ]
  },
  
  // Diagnostic Insights
  diagnosticInsights: [
    {
      id: 1,
      phenomenon: "46% có cam kết đầu ra, 42% không có",
      metric1: 46,
      metric2: 42,
      rootCause: "Cam kết tạo rủi ro cho trung tâm nếu học viên không đạt. Nhiều trung tâm nhỏ không đủ nguồn lực để hỗ trợ học lại.",
      implication: "Cam kết đang trở thành TIÊU CHUẨN NGÀNH. Không có cam kết = bất lợi cạnh tranh rõ rệt.",
      actionable: "Triển khai cam kết với điều kiện hợp lý: 85% tham gia + Thi cuối kỳ"
    },
    {
      id: 2,
      phenomenon: "Chỉ 2% có thi thử HSK, 98% bỏ ngỏ",
      metric1: 2,
      metric2: 98,
      rootCause: "Thiếu hệ thống đánh giá chuẩn và phòng thi tiêu chuẩn. Đa số chỉ cam kết dựa trên bài kiểm tra nội bộ.",
      implication: "KHOẢNG TRỐNG CHIẾN LƯỢC. Học viên khao khát chứng chỉ nhưng không có môi trường cọ xát thực tế trước khi thi thật.",
      actionable: "Triển khai Phòng thi thử HSK định kỳ, cung cấp báo cáo phân tích điểm yếu để bảo chứng kết quả đầu ra."
    },
    {
      id: 3,
      phenomenon: "82% không có GVBX, 87% GVVN thuần túy",
      metric1: 82,
      metric2: 87,
      rootCause: "GVBX khan hiếm, lương cao. Trung tâm nhỏ không đủ nguồn lực. BD có nhiều người gốc Hoa nhưng chưa khai thác tốt.",
      implication: "GVBX là USP khan hiếm. Chỉ cần vài buổi/khóa đã tạo khác biệt.",
      actionable: "Hợp tác GVBX bán thời gian, 4-6 buổi/khóa cho phần Nghe-Nói"
    }//,
    // {
    //   id: 4,
    //   phenomenon: "Giá HCM gấp 1.7x Bình Dương (105K vs 62K/giờ)",
    //   metric1: 105,
    //   metric2: 62,
    //   rootCause: "HCM có đối tượng thu nhập cao hơn, yêu cầu cao hơn. BD cạnh tranh gay gắt về giá, biên độ hẹp.",
    //   implication: "HCM có không gian premium pricing. BD phải cạnh tranh bằng dịch vụ, không phải giá.",
    //   actionable: "HCM: Định vị premium với GVBX, cam kết. BD: Tạo khác biệt bằng dịch vụ gia tăng"
    // }
  ],
  
  // Ma trận cạnh tranh
  competitiveMatrix: [
    { name: "CGE", price: 6.5, gvbx: 8, commitment: 9, csvc: 9, consult: 6, diversity: 10, total: 7.75 },
    { name: "Newsky", price: 8, gvbx: 7, commitment: 8, csvc: 7, consult: 7, diversity: 8, total: 7.25 },
    { name: "THANHMAIHSK", price: 5, gvbx: 5, commitment: 9, csvc: 7, consult: 9, diversity: 6, total: 7.0 },
    { name: "iChinese", price: 7, gvbx: 5, commitment: 8, csvc: 7, consult: 6, diversity: 7, total: 6.85 },
    { name: "Ni Hao Ma", price: 3, gvbx: 10, commitment: 5, csvc: 8, consult: 7, diversity: 5, total: 6.15 }
  ],
  
  // Khuyến nghị
  recommendations: {
    quickWins: [
      { action: "Cam kết học lại miễn phí", timeline: "0-1 tháng", impact: "★★★★★", effort: "★★", risk: "Chi phí nếu nhiều HV học lại" },
      { action: "Tặng sách gốc (tính vào giá)", timeline: "0-1 tháng", impact: "★★★", effort: "★", risk: "Tăng giá vốn nhẹ" },
      { action: "Chuẩn hóa quy trình tư vấn", timeline: "1-2 tháng", impact: "★★★★", effort: "★★", risk: "Không" }
    ],
    shortTerm: [
      { action: "Xây ngân hàng đề luyện thi HSK", timeline: "3-4 tháng", impact: "★★★★★", effort: "★★★", risk: "Cần expertise" },
      { action: "Tổ chức thi thử HSK định kỳ", timeline: "3-4 tháng", impact: "★★★★", effort: "★★", risk: "Logistics" },
      { action: "Record bài giảng", timeline: "2-3 tháng", impact: "★★★", effort: "★★", risk: "Bản quyền GV" }
    ],
    mediumTerm: [
      { action: "Tuyển/Hợp tác GVBX", timeline: "6-12 tháng", impact: "★★★★★", effort: "★★★★", risk: "Chi phí cao" },
      { action: "Đẩy mạnh/Phát triển khóa Online", timeline: "6-9 tháng", impact: "★★★★", effort: "★★★", risk: "Cạnh tranh với platform lớn" },
      { action: "Đẩy mạnh/Phát triển khóa Thiếu nhi", timeline: "6-12 tháng", impact: "★★★★", effort: "★★★", risk: "Cần đội ngũ GV chuyên biệt" }
    ]
  },
  
  // Timeline Chart Data
  timelineByLevel: [
    { level: "HSK 1", hours: 50, months: 3.1, sessionsPerWeek: 3 },
    { level: "HSK 2", hours: 53, months: 3.2, sessionsPerWeek: 3 },
    { level: "HSK 3", hours: 60, months: 3.6, sessionsPerWeek: 3 },
    { level: "HSK 4", hours: 81, months: 4.7, sessionsPerWeek: 3 },
    { level: "HSK 5", hours: 103, months: 7.9, sessionsPerWeek: 2 }
  ],
  
  // Class size distribution
  classSize: [
    { name: "3-5 HV (Premium)", percent: 5 },
    { name: "5-8 HV (Cao cấp)", percent: 12 },
    { name: "8-12 HV (Chuẩn)", percent: 39 },
    { name: "10-15 HV (Phổ thông)", percent: 29 },
    { name: ">15 HV (Đông)", percent: 3 },
    { name: "1:1", percent: 2 },
    { name: "Chưa rõ", percent: 10 }
  ],
  
  // Equipment
  equipment: [
    { name: "TV", percent: 48, color: "#3b82f6" },
    { name: "Không có", percent: 26, color: "#f43f5e" },
    { name: "Máy chiếu", percent: 11, color: "#f59e0b" },
    { name: "Chưa rõ", percent: 15, color: "#6b7280" }
  ]
};

// ============================================
// COMPONENTS
// ============================================

const HeroMetric = ({ value, label, sublabel, accent = false }) => (
  <div className={`text-center ${accent ? 'text-rose-400' : 'text-white'}`}>
    <div className={`text-5xl font-bold tracking-tight ${accent ? 'text-rose-400' : 'text-white'}`}>
      {value}
    </div>
    <div className="text-sm text-zinc-400 mt-1">{label}</div>
    {sublabel && <div className="text-xs text-zinc-500">{sublabel}</div>}
  </div>
);

const KPICard = ({ icon: Icon, label, value, gap, color = "zinc", insight }) => {
  const colors = {
    rose: "text-rose-400 bg-rose-500/10",
    blue: "text-blue-400 bg-blue-500/10",
    emerald: "text-emerald-400 bg-emerald-500/10",
    amber: "text-amber-400 bg-amber-500/10",
    violet: "text-violet-400 bg-violet-500/10",
    zinc: "text-zinc-400 bg-zinc-500/10"
  };

  return (
    <div className="group relative">
      <div className="flex items-center gap-3 p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-all">
        <div className={`p-2.5 rounded-lg ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-zinc-500 uppercase tracking-wide">{label}</div>
          <div className="text-xl font-semibold text-white">{value}%</div>
        </div>
        {gap && (
          <div className="text-right opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="text-xs text-zinc-500">Gap</div>
            <div className="text-sm font-medium text-amber-400">{gap}%</div>
          </div>
        )}
      </div>
      {insight && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-zinc-800 rounded-lg text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          💡 {insight}
        </div>
      )}
    </div>
  );
};

const ExpandableSection = ({ title, children, defaultOpen = false, badge }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-zinc-800/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-300">{title}</span>
          {badge && <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full">{badge}</span>}
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4 text-zinc-500" /> : <ChevronRight className="w-4 h-4 text-zinc-500" />}
      </button>
      {isOpen && <div className="p-4 bg-zinc-900/20">{children}</div>}
    </div>
  );
};

const InsightCard = ({ icon, title, value, description, type = "default" }) => {
  const styles = {
    opportunity: "border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent",
    success: "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent",
    warning: "border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-transparent",
    default: "border-zinc-700/50 bg-zinc-900/40"
  };
  const textColors = {
    opportunity: "text-amber-400",
    success: "text-emerald-400",
    warning: "text-rose-400",
    default: "text-zinc-300"
  };

  return (
    <div className={`p-5 rounded-xl border ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">{title}</span>
            <span className={`text-2xl font-bold ${textColors[type]}`}>{value}</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

const DiagnosticCard = ({ phenomenon, metric1, metric2, rootCause, implication, actionable }) => (
  <div className="bg-zinc-900/40 rounded-2xl border border-zinc-800/50 overflow-hidden">
    <div className="p-5 border-b border-zinc-800/50">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="w-4 h-4 text-blue-400" />
        <span className="text-xs text-blue-400 uppercase tracking-wider font-medium">Hiện tượng</span>
      </div>
      <p className="text-sm text-zinc-300">{phenomenon}</p>
      <div className="flex items-center gap-4 mt-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{metric1}%</div>
        </div>
        <ArrowRight className="w-5 h-5 text-zinc-600" />
        <div className="text-center">
          <div className="text-2xl font-bold text-rose-400">{metric2}%</div>
        </div>
      </div>
    </div>
    <div className="p-5 border-b border-zinc-800/50 bg-rose-500/5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-rose-400" />
        <span className="text-xs text-rose-400 uppercase tracking-wider font-medium">Nguyên nhân gốc</span>
      </div>
      <p className="text-xs text-zinc-400">{rootCause}</p>
    </div>
    <div className="p-5 border-b border-zinc-800/50 bg-amber-500/5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-amber-400" />
        <span className="text-xs text-amber-400 uppercase tracking-wider font-medium">Hàm ý chiến lược</span>
      </div>
      <p className="text-xs text-zinc-400">{implication}</p>
    </div>
    <div className="p-5 bg-emerald-500/5">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-4 h-4 text-emerald-400" />
        <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium">Hành động</span>
      </div>
      <p className="text-xs text-zinc-400">{actionable}</p>
    </div>
  </div>
);

const SimpleBar = ({ label, value, maxValue = 100, color = "#f43f5e", subLabel }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-xs text-zinc-400">{label}</span>
      <span className="text-xs font-medium text-zinc-300">{value}%</span>
    </div>
    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(value / maxValue) * 100}%`, backgroundColor: color }} />
    </div>
    {subLabel && <div className="text-xs text-zinc-500">{subLabel}</div>}
  </div>
);

const formatPrice = (value) => {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
  if (value >= 1000) return (value / 1000).toFixed(0) + "K";
  return value;
};

// ============================================
// MAIN DASHBOARD
// ============================================
export default function ChineseMarketDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'pricing', label: 'Giá cả' },
    { id: 'training', label: 'Đào tạo' },
    { id: 'diagnostic', label: 'Chẩn đoán', badge: '!' },
    { id: 'competitive', label: 'Cạnh tranh' },
    { id: 'recommendations', label: 'Khuyến nghị' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-rose-400 font-medium tracking-wider mb-1">STRATEGIC MARKET ANALYSIS</div>
              <h1 className="text-xl font-semibold text-white">PHÂN TÍCH THỊ TRƯỜNG ĐÀO TẠO TIẾNG TRUNG 2025</h1>
            </div>
            <nav className="flex gap-1 bg-zinc-900/50 p-1 rounded-lg overflow-x-auto hide-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                  {tab.badge && <span className="px-1.5 py-0.5 text-xs bg-rose-500/20 text-rose-400 rounded">{tab.badge}</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ==================== TAB: TỔNG QUAN ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* HERO */}
            <section className="text-center py-8">
              <div className="flex items-center justify-center gap-12">
                <HeroMetric value={data.totalCenters} label="Trung tâm khảo sát" sublabel="HCM • Bình Dương • Q1/2025" accent />
                <div className="w-px h-16 bg-zinc-800" />
                <HeroMetric value={data.totalCourses} label="Khóa học phân tích" />
              </div>
              
              <div className="flex items-center justify-center gap-8 mt-8">
                {data.regions.slice(0, 2).map((region, i) => (
                  <React.Fragment key={region.name}>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-white">{region.centers}</div>
                      <div className="text-xs text-zinc-500">{region.name}</div>
                      <div className="text-xs text-zinc-600">TB: {formatPrice(region.avgPrice)}</div>
                    </div>
                    {i === 0 && <div className="w-px h-8 bg-zinc-800" />}
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* NGHỊCH LÝ CỐT LÕI */}
            <section className="bg-gradient-to-br from-rose-500/10 via-transparent to-blue-500/10 rounded-2xl p-6 border border-zinc-800/50">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h2 className="text-lg font-semibold text-white">Phát hiện quan trọng nhất</h2>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">2%</div>
                  <div className="text-sm text-zinc-400 mt-1">Có phòng thi thử HSK</div>
                  <div className="text-xs text-zinc-600">GAP cực lớn (98%) – Khoảng trống thị trường xanh</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-amber-400 mx-auto" />
                    <div className="text-xs text-amber-400 mt-1">CƠ HỘI</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400">18%</div>
                  <div className="text-sm text-zinc-400 mt-1">Có Giáo viên bản xứ</div>
                  <div className="text-xs text-zinc-600">USP khan hiếm – Chỉ 1/5 thị trường đáp ứng được</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-zinc-900/60 rounded-xl">
                <p className="text-sm text-zinc-400">
                  <strong className="text-amber-400">💡 Insight:</strong> Với việc<span className="text-rose-400"> 98% </span> đối thủ bỏ ngỏ phòng thi thử và<span className="text-rose-400"> 82% </span> thiếu giáo viên bản xứ, đây là "Đại dương xanh" để bứt phá. Tập trung vào hai mũi nhọn này sẽ chuyển đổi vị thế từ một trung tâm dạy học thuần túy sang<span className="text-rose-400"> Đơn vị bảo chứng kết quả</span>, trực tiếp đánh đầu vào nhu cầu cấp thiết nhất của học viên mà thị trường chưa đáp ứng được. 
                </p>
                </div>
            </section>

            {/* KEY METRICS */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Khoảng trống thị trường (GAP = Cơ hội)</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <KPICard icon={GraduationCap} label="GV trình độ HSK 6" value={8} gap={92} color="amber" insight="Chỉ 8% GV đạt mức này, điểm khác biệt để khẳng định chuyên môn" />
                <KPICard icon={GraduationCap} label="Có GVBX" value={18} gap={82} color="amber" insight="GVBX khan hiếm - USP mạnh nếu có" />
                <KPICard icon={Shield} label="Cam kết đầu ra" value={46} gap={54} color="blue" insight="Đang trở thành tiêu chuẩn ngành" />
                <KPICard icon={BookOpen} label="Record bài giảng" value={7} gap={93} color="violet" insight="Học viên cần ôn lại, ít TT cung cấp" />
                <KPICard icon={Award} label="Thi thử HSK" value={2} gap={98} color="emerald" insight="Gần như không ai có - Blue ocean" />
                <KPICard icon={Globe} label="App học tập" value={1} gap={99} color="zinc" insight="GAP lớn nhất thị trường; cơ hội số hóa trải nghiệm người dùng" />
              </div>
            </section>

            {/* PHÂN BỐ KHÓA HỌC */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Phân bố khóa học</h2>
                  <p className="text-sm text-zinc-500">HSK 1-3 chiếm 67% • Thiếu nhi có giá cao nhất</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  {data.courseDistribution.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-sm text-zinc-300 w-20">{item.name}</span>
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
                      </div>
                      <span className="text-sm font-semibold text-white w-12 text-right">{item.percent}%</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={data.courseDistribution} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name}: ${percent}%`}>
                        {data.courseDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* TOP 6 CƠ HỘI */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Top 6 Cơ hội chiến lược</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <InsightCard icon="🎯" title="Luyện thi HSK chuyên sâu" value="96%" description="GAP = 96% không có → First mover advantage" type="opportunity" />
                <InsightCard icon="📝" title="Thi thử HSK định kỳ" value="98%" description="Chỉ 2% có phòng thi mock → Blue ocean" type="opportunity" />
                <InsightCard icon="🎓" title="GVBX" value="82%" description="82% không có → USP khan hiếm" type="opportunity" />
                <InsightCard icon="📹" title="Record bài giảng" value="93%" description="Học viên cần ôn lại → Giá trị cao" type="opportunity" />
                <InsightCard icon="📱" title="📱" value="99%" description="99% thị trường bỏ ngỏ công nghệ → Trải nghiệm khác biệt." type="success" />
                <InsightCard icon="🏢" title="Hỗ trợ việc làm" value="98%" description="Chỉ 2% có dịch vụ → Đánh trúng mục tiêu thực dụng." type="opportunity" />
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB: GIÁ CẢ ==================== */}
{activeTab === 'pricing' && (
  <div className="space-y-8">
    {/* HERO PRICE COMPARISON */}
    <section className="bg-gradient-to-br from-blue-500/10 via-transparent to-rose-500/10 rounded-2xl p-6 border border-zinc-800/50">
      <h2 className="text-lg font-semibold text-white mb-6">So sánh giá theo khu vực</h2>
      <div className="grid grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400">6.0M</div>
          <div className="text-sm text-zinc-400">TB Offline HCM</div>
          <div className="text-xs text-zinc-600 mt-1">105K/giờ</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">1.7x</div>
            <div className="text-xs text-zinc-500">Chênh lệch</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-rose-400">3.0M</div>
          <div className="text-sm text-zinc-400">TB Offline BD</div>
          <div className="text-xs text-zinc-600 mt-1">62K/giờ</div>
        </div>
      </div>
    </section>

    {/* BẢNG GIÁ THEO KHU VỰC VÀ CẤP ĐỘ */}
    <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">So sánh Giá theo Khu vực & Cấp độ</h2>
        <span className="text-xs text-zinc-500 italic">* Đơn vị: VNĐ/Khóa</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-zinc-500 text-xs uppercase border-b border-zinc-800">
              <th className="text-left py-4 px-2">Cấp độ</th>
              <th className="text-right py-4 px-2 bg-blue-500/5 text-blue-400">Online HCM</th>
              <th className="text-right py-4 px-2 bg-emerald-500/5 text-emerald-400">Offline HCM</th>
              <th className="text-right py-4 px-2 bg-indigo-500/5 text-indigo-400">Online BD</th>
              <th className="text-right py-4 px-2 bg-teal-500/5 text-teal-400">Offline BD</th>
              <th className="text-right py-4 px-2">Min - Max</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            {priceData.map((item, i) => (
              <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                <td className="py-4 px-2 font-bold text-white">{item.level}</td>
                
                {/* Giá HCM */}
                <td className="text-right px-2 font-medium">{item.onlineHCM.toLocaleString()}</td>
                <td className="text-right px-2 font-medium">{item.offlineHCM.toLocaleString()}</td>
                
                {/* Giá Bình Dương */}
                <td className="text-right px-2 text-zinc-400">{item.onlineBD.toLocaleString()}</td>
                <td className="text-right px-2 text-zinc-400">{item.offlineBD.toLocaleString()}</td>
                
                {/* Biên độ Min-Max */}
                <td className="text-right px-2">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-zinc-500">
                      {item.min.toLocaleString()} - {item.max.toLocaleString()}
                    </span>
                    <div className="w-24 h-1.5 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-rose-500"
                        style={{ width: `${(item.max / 18000000) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-4 bg-zinc-800/20 rounded-lg border border-zinc-800/50">
        <p className="text-xs text-zinc-500 leading-relaxed">
          <span className="text-amber-500 font-bold">💡 INSIGHT:</span> Giá trung bình tại HCM hiện cao gấp 1.8 lần Bình Dương. Phân khúc HSK 3-4 tại SHZ đang có lợi thế cạnh tranh cực lớn khi thấp hơn trung bình thị trường từ 21-51% đối với hệ Online[cite: 196, 215].
        </p>
      </div>
    </section>

    {/* PRICE CHART */}
    <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
      <h2 className="text-lg font-semibold text-white mb-6">Biểu đồ giá Online vs Offline</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.priceByLevel}>
          <XAxis dataKey="level" stroke="#71717a" fontSize={12} />
          <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => formatPrice(v)} />
          <Tooltip formatter={(value) => formatPrice(value)} contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }} />
          <Bar dataKey="online" name="Online" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="offline" name="Offline" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>

    {/* TOP TRUNG TÂM GIÁ */}
    <div className="grid grid-cols-2 gap-6">
      <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
        <h2 className="text-lg font-semibold text-white mb-4">🔥 Top 5 giá cao nhất</h2>
        <div className="space-y-3">
          {data.topCenters.byHighPrice.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
              <div>
                <div className="text-sm font-medium text-white">{item.name}</div>
                <div className="text-xs text-zinc-500">{item.feature}</div>
              </div>
              <div className="text-rose-400 font-semibold">{formatPrice(item.avgPrice)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
        <h2 className="text-lg font-semibold text-white mb-4">💰 Top 5 giá thấp nhất</h2>
        <div className="space-y-3">
          {data.topCenters.byLowPrice.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
              <div>
                <div className="text-sm font-medium text-white">{item.name}</div>
                <div className="text-xs text-zinc-500">{item.region}</div>
              </div>
              <div className="text-emerald-400 font-semibold">{formatPrice(item.avgPrice)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
)}

        {/* ==================== TAB: ĐÀO TẠO ==================== */}
        {activeTab === 'training' && (
          <div className="space-y-8">
            {/* GIÁO TRÌNH */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">Giáo trình sử dụng</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  {data.curriculum.map((item, i) => (
                    <SimpleBar key={i} label={item.name} value={item.percent} color={i === 0 ? "#3b82f6" : i === 1 ? "#f59e0b" : "#6b7280"} subLabel={`${item.count} khóa`} />
                  ))}
                </div>
                <div className="p-4 bg-zinc-800/30 rounded-xl">
                  <h3 className="text-sm font-medium text-zinc-300 mb-3">💡 Insight giáo trình</h3>
                  <div className="space-y-2 text-xs text-zinc-400">
                    <p>• <span className="text-blue-400">HSK chuẩn (42%)</span> phổ biến nhất - học viên có thể thi chứng chỉ</p>
                    <p>• <span className="text-amber-400">Hán Ngữ (20%)</span> truyền thống, phổ biến tại BD</p>
                    <p>• <span className="text-zinc-300">Tự biên soạn (16%)</span> linh hoạt nhưng thiếu chuẩn hóa</p>
                    <p className="pt-2 text-emerald-400">→ Khuyến nghị: Dùng HSK chuẩn + tài liệu bổ sung tự biên soạn</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ĐỘI NGŨ GIÁO VIÊN */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">Đội ngũ giáo viên</h2>
              <div className="grid grid-cols-3 gap-6">
                {/* Loại GV */}
                <div>
                  <h3 className="text-sm text-zinc-400 mb-4">Phân loại GV</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={data.teachers.types} dataKey="percent" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                        {data.teachers.types.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "#3b82f6" : index === 1 ? "#f59e0b" : index === 2 ? "#10b981" : "#6b7280"} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Trình độ */}
                <div>
                  <h3 className="text-sm text-zinc-400 mb-4">Trình độ GV</h3>
                  <div className="space-y-2">
                    {data.teachers.qualifications.map((item, i) => (
                      <SimpleBar key={i} label={item.name} value={item.percent} maxValue={30} color={i === 0 ? "#3b82f6" : "#6b7280"} />
                    ))}
                  </div>
                </div>
                
                {/* Insight */}
                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <h3 className="text-sm font-medium text-amber-400 mb-3">⚠️ Insight quan trọng</h3>
                  <div className="space-y-2 text-xs text-zinc-400">
                    <p><strong className="text-white">87% GVVN thuần túy</strong></p>
                    <p>Chỉ <span className="text-amber-400">11 trung tâm</span> có GVBX</p>
                    <p className="pt-2">GVBX là USP khan hiếm. Chỉ cần <span className="text-emerald-400">4-6 buổi/khóa</span> đã tạo khác biệt lớn.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* THỜI LƯỢNG */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">Thời lượng khóa học</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.timelineByLevel}>
                  <XAxis dataKey="level" stroke="#71717a" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#3b82f6" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }} />
                  <Bar yAxisId="left" dataKey="hours" name="Số giờ" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="months" name="Số tháng" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
                <div className="mt-4 p-4 bg-zinc-800/30 rounded-xl text-xs text-zinc-400">
                  <strong className="text-white font-medium">Tiêu chuẩn phổ biến:</strong>{' '}
                  3 buổi/tuần, 90 phút/buổi (chiếm {'>'}80% thị trường)[cite: 105]. 
                  Riêng HSK 5 chuyển sang lộ trình 2 buổi/tuần (89%)  để tối ưu thời gian tự học.
                </div>
              </section>
            {/* QUY MÔ LỚP & THIẾT BỊ */}
            <div className="grid grid-cols-2 gap-6">
              <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
                <h2 className="text-lg font-semibold text-white mb-4">Quy mô lớp học</h2>
                <div className="space-y-2">
                  {data.classSize.map((item, i) => (
                    <SimpleBar key={i} label={item.name} value={item.percent} maxValue={40} 
                              color={i === 0 ? "#f59e0b" : i === 1 ? "#10b981" : i === 2 ? "#3b82f6" : "#6b7280"} />
                  ))}
                </div>
                <div className="mt-4 text-xs text-zinc-500">
                  💡 68% lớp có 8-15 học viên = tiêu chuẩn thị trường. Lớp nhỏ (&lt;8) có thể định giá premium +20-50%.
                </div>
              </section>

              <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
                <h2 className="text-lg font-semibold text-white mb-4">Thiết bị phòng học</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={data.equipment} dataKey="percent" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {data.equipment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 text-xs text-zinc-500">
                  ⚠️ <span className="text-rose-400">26% không có thiết bị</span> - chủ yếu tại BD. Đầu tư TV/máy chiếu là cách đơn giản nâng cấp trải nghiệm.
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ==================== TAB: CHẨN ĐOÁN ==================== */}
        {activeTab === 'diagnostic' && (
          <div className="space-y-8">
            <section className="text-center py-4">
              <h2 className="text-2xl font-bold text-white">Chẩn đoán chiến lược</h2>
              <p className="text-zinc-500 mt-1">Hiện tượng → Nguyên nhân gốc → Hàm ý → Hành động</p>
            </section>

            <div className="grid grid-cols-2 gap-6">
              {data.diagnosticInsights.map((insight, i) => (
                <DiagnosticCard key={i} {...insight} />
              ))}
            </div>

            {/* DỊCH VỤ HỖ TRỢ - GAP ANALYSIS */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">Gap Analysis: Dịch vụ hỗ trợ</h2>
              <div className="space-y-3">
                {data.services.map((service, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      service.type === 'gap' ? 'bg-rose-500/20 text-rose-400' :
                      service.type === 'premium' ? 'bg-amber-500/20 text-amber-400' :
                      service.type === 'value-add' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-zinc-700 text-zinc-400'
                    }`}>
                      {service.type === 'gap' ? 'GAP' : service.type === 'premium' ? 'Premium' : service.type === 'value-add' ? 'Giá trị+' : 'Chuẩn'}
                    </span>
                    <span className="text-sm text-zinc-300 w-44">{service.name}</span>
                    <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" 
                           style={{ width: `${service.percent}%`, backgroundColor: service.type === 'gap' ? '#f43f5e' : service.type === 'premium' ? '#f59e0b' : '#3b82f6' }} />
                    </div>
                    <span className="text-sm font-semibold text-white w-12 text-right">{service.percent}%</span>
                    <span className="text-xs text-zinc-500 w-16 text-right">Gap: {100 - service.percent}%</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ĐÁNH GIÁ TƯ VẤN */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">Chất lượng tư vấn</h2>
              <div className="grid grid-cols-3 gap-6">
                {data.consultationRating.map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-xl" style={{ backgroundColor: `${item.color}15` }}>
                    <div className="text-3xl font-bold" style={{ color: item.color }}>{item.percent}%</div>
                    <div className="text-sm text-zinc-400 mt-1">{item.name}</div>
                    <div className="text-xs text-zinc-500">{item.count} khóa</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">Tích cực</span>
                  </div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>• Gửi hình ảnh giáo trình, lộ trình trực quan</li>
                    <li>• Follow up thường xuyên (24-48h)</li>
                    <li>• Tư vấn chuyên nghiệp, dễ thương</li>
                  </ul>
                </div>
                <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsDown className="w-4 h-4 text-rose-400" />
                    <span className="text-sm font-medium text-rose-400">Tiêu cực</span>
                  </div>
                  <ul className="text-xs text-zinc-400 space-y-1">
                    <li>• Không take care tốt, không nhiệt tình</li>
                    <li>• Dồn quá nhiều thông tin cùng lúc</li>
                    <li>• Không phản hồi liên hệ trực tuyến</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB: CẠNH TRANH ==================== */}
        {activeTab === 'competitive' && (
          <div className="space-y-8">
            {/* TOP TRUNG TÂM */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">Top trung tâm theo số khóa học</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 text-xs uppercase border-b border-zinc-800">
                      <th className="text-left py-3">#</th>
                      <th className="text-left py-3">Trung tâm</th>
                      <th className="text-center py-3">Khóa học</th>
                      <th className="text-center py-3">Khu vực</th>
                      <th className="text-right py-3">Giá TB</th>
                      <th className="text-center py-3">GVBX</th>
                      <th className="text-center py-3">Cam kết</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    {data.topCenters.byCourses.map((center, i) => (
                      <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="py-3 text-rose-400 font-bold">{i + 1}</td>
                        <td className="py-3 font-medium text-white">{center.name}</td>
                        <td className="text-center">{center.courses}</td>
                        <td className="text-center text-zinc-500">{center.region}</td>
                        <td className="text-right text-amber-400">{formatPrice(center.avgPrice)}</td>
                        <td className="text-center">{center.hasGVBX ? <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-zinc-600 mx-auto" />}</td>
                        <td className="text-center">{center.hasCommitment ? <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-zinc-600 mx-auto" />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* MA TRẬN CẠNH TRANH */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">Ma trận cạnh tranh Top 5</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 text-xs uppercase border-b border-zinc-800">
                      <th className="text-left py-3">Trung tâm</th>
                      <th className="text-center py-3">Giá cả (20%)</th>
                      <th className="text-center py-3">GVBX (15%)</th>
                      <th className="text-center py-3">Cam kết (15%)</th>
                      <th className="text-center py-3">CSVC (15%)</th>
                      <th className="text-center py-3">Tư vấn (10%)</th>
                      <th className="text-center py-3">Đa dạng (10%)</th>
                      <th className="text-center py-3 text-rose-400">TỔNG</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    {data.competitiveMatrix.map((center, i) => (
                      <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="py-3 font-medium text-white">{center.name}</td>
                        <td className="text-center">{center.price}/10</td>
                        <td className="text-center">{center.gvbx}/10</td>
                        <td className="text-center">{center.commitment}/10</td>
                        <td className="text-center">{center.csvc}/10</td>
                        <td className="text-center">{center.consult}/10</td>
                        <td className="text-center">{center.diversity}/10</td>
                        <td className="text-center font-bold text-rose-400">{center.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* RADAR CHART */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">So sánh năng lực cạnh tranh</h2>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={[
                  { subject: 'Giá cả', CGE: 6, Newsky: 8, THANHMAIHSK: 5, max: 10 },
                  { subject: 'GVBX', CGE: 8, Newsky: 7, THANHMAIHSK: 5, max: 10 },
                  { subject: 'Cam kết', CGE: 9, Newsky: 8, THANHMAIHSK: 9, max: 10 },
                  { subject: 'CSVC', CGE: 9, Newsky: 7, THANHMAIHSK: 7, max: 10 },
                  { subject: 'Tư vấn', CGE: 6, Newsky: 7, THANHMAIHSK: 9, max: 10 },
                  { subject: 'Đa dạng', CGE: 10, Newsky: 8, THANHMAIHSK: 6, max: 10 }
                ]}>
                  <PolarGrid stroke="#3f3f46" />
                  <PolarAngleAxis dataKey="subject" stroke="#71717a" fontSize={12} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#3f3f46" />
                  <Radar name="CGE" dataKey="CGE" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Newsky" dataKey="Newsky" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Radar name="THANHMAIHSK" dataKey="THANHMAIHSK" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }} />
                </RadarChart>
              </ResponsiveContainer>
            </section>

            {/* DANH SÁCH GVBX */}
            <ExpandableSection title="📋 Danh sách 11 trung tâm có GVBX" badge="Khan hiếm">
              <div className="grid grid-cols-3 gap-3">
                {data.teachers.centersWithGVBX.map((name, i) => (
                  <div key={i} className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-sm text-amber-400">
                    {name}
                  </div>
                ))}
              </div>
            </ExpandableSection>
          </div>
        )}

        {/* ==================== TAB: KHUYẾN NGHỊ ==================== */}
        {activeTab === 'recommendations' && (
          <div className="space-y-8">
            {/* QUICK WINS */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                🚀 Quick Wins (0-3 tháng) — Làm ngay
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {data.recommendations.quickWins.map((item, i) => (
                  <div key={i} className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-emerald-400">{item.action}</span>
                      <span className="text-xs text-zinc-500">{item.timeline}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs mb-3">
                      <div><span className="text-zinc-500">Impact:</span><span className="text-amber-400 ml-1">{item.impact}</span></div>
                      <div><span className="text-zinc-500">Effort:</span><span className="text-blue-400 ml-1">{item.effort}</span></div>
                    </div>
                    <div className="text-xs text-zinc-500"><span className="text-rose-400">Risk:</span> {item.risk}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* SHORT TERM */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                📈 Short-term (3-6 tháng) — Xây dựng năng lực
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {data.recommendations.shortTerm.map((item, i) => (
                  <div key={i} className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-blue-400">{item.action}</span>
                      <span className="text-xs text-zinc-500">{item.timeline}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs mb-3">
                      <div><span className="text-zinc-500">Impact:</span><span className="text-amber-400 ml-1">{item.impact}</span></div>
                      <div><span className="text-zinc-500">Effort:</span><span className="text-blue-400 ml-1">{item.effort}</span></div>
                    </div>
                    <div className="text-xs text-zinc-500"><span className="text-rose-400">Risk:</span> {item.risk}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* MEDIUM TERM */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                🎯 Medium-term (6-12 tháng) — Scale & Differentiate
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {data.recommendations.mediumTerm.map((item, i) => (
                  <div key={i} className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-amber-400">{item.action}</span>
                      <span className="text-xs text-zinc-500">{item.timeline}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs mb-3">
                      <div><span className="text-zinc-500">Impact:</span><span className="text-amber-400 ml-1">{item.impact}</span></div>
                      <div><span className="text-zinc-500">Effort:</span><span className="text-blue-400 ml-1">{item.effort}</span></div>
                    </div>
                    <div className="text-xs text-zinc-500"><span className="text-rose-400">Risk:</span> {item.risk}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ACTION PRIORITIES */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-4">Ưu tiên hành động theo Timeline</h2>
              <div className="space-y-3">
                {[
                  { priority: "P1", action: "Triển khai cam kết học lại miễn phí", timeline: "Tháng 1", reason: "46% đã có → Không có = bất lợi" },
                  { priority: "P1", action: "Xây ngân hàng đề luyện thi HSK", timeline: "Tháng 1-3", reason: "96% không có → First mover advantage" },
                  { priority: "P1", action: "Chuẩn hóa quy trình tư vấn", timeline: "Tháng 1-2", reason: "13% tiêu cực → Cải thiện ngay" },
                  { priority: "P2", action: "Tổ chức thi thử HSK định kỳ", timeline: "Tháng 3-4", reason: "98% không có → Blue ocean" },
                  { priority: "P2", action: "Record bài giảng", timeline: "Tháng 2-4", reason: "93% không có → Giá trị cao cho HV" },
                  { priority: "P2", action: "Tặng sách gốc (marketing)", timeline: "Tháng 2", reason: "39% đã làm → Tiêu chuẩn ngành" },
                  { priority: "P3", action: "Tuyển/Hợp tác GVBX", timeline: "Tháng 6-12", reason: "82% không có → USP mạnh" },
                  { priority: "P3", action: "Mở phân khúc Thiếu nhi", timeline: "Tháng 6-12", reason: "Giá cao 8.3M TB → Premium segment" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-zinc-800/30 rounded-lg">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      item.priority === 'P1' ? 'bg-rose-500/20 text-rose-400' :
                      item.priority === 'P2' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>{item.priority}</span>
                    <div className="flex-1">
                      <div className="text-sm text-zinc-300">{item.action}</div>
                      <div className="text-xs text-zinc-500">{item.reason}</div>
                    </div>
                    <span className="text-xs text-zinc-500">{item.timeline}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* KEY TAKEAWAYS */}
            <ExpandableSection title="💎 Key Takeaways" badge="Quan trọng" defaultOpen>
              <div className="space-y-4">
        
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <div className="text-sm font-medium text-amber-400 mb-2">Cam kết đang trở thành tiêu chuẩn</div>
                  <p className="text-xs text-zinc-400">
                    46% đã có cam kết học lại. Không có cam kết = mất lợi thế cạnh tranh. 
                    Điều kiện hợp lý: 85% tham gia + Thi cuối kỳ.
                  </p>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="text-sm font-medium text-blue-400 mb-2">GVBX là USP khan hiếm</div>
                  <p className="text-xs text-zinc-400">
                    82% không có GVBX. Chỉ cần 4-6 buổi/khóa cho phần Nghe-Nói đã tạo khác biệt lớn. 
                    Hợp tác bán thời gian là giải pháp khả thi.
                  </p>
                </div>
              </div>
            </ExpandableSection>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-xs text-zinc-600">
            Strategic Market Analysis Dashboard • 62 trung tâm • 179 khóa học • HCM & Bình Dương • Q1/2025
          </p>
          <p className="text-xs text-zinc-700 mt-1">
            Dữ liệu từ báo cáo phân tích thị trường đào tạo tiếng Trung Việt Nam
          </p>
        </div>
      </footer>
    </div>
  );
}
