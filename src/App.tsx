import { useState, useEffect } from 'react';
import { 
  Bell, 
  Scan, 
  Wifi, 
  AlertTriangle, 
  Syringe, 
  MapPin, 
  Stethoscope, 
  Scissors, 
  Home, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  Plus,
  Map as MapIcon,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SHEEP_DATA = [
  {
    id: "#0492",
    rfid: "752-039-482-11",
    gender: "公",
    age: "24个月",
    weight: "42.5kg",
    steps: "8,420",
    temp: "38.2°C",
    rumination: "42分钟/小时",
    location: "3号草场",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6qPDXEdOHuKqcO5CO7Xt2X0uoUDk9OS_09ohioDZiIwvNcKdhYC6Y0ZaWLng6f_2g-xqOOFKe10un0B99z9rFH4PSUIwbEISm-CmkDdumy3a-tarzaKtJpAfvFCk_KnEot_9L-xDjJgCbsnITIpkQT3vpINDQ5M5LunxKRTxn7eJjzZf8DdDpyBlPFfiClvbHzJl3rU0PhWbK6_g6C0_aZLZnh81ZWi2Zda48Hl8nintMpvleR-u5NerBs6Zs47UQAhcI3EeAkMc"
  },
  {
    id: "#0518",
    rfid: "752-039-482-25",
    gender: "母",
    age: "18个月",
    weight: "38.2kg",
    steps: "7,150",
    temp: "38.5°C",
    rumination: "38分钟/小时",
    location: "1号草场",
    image: "https://picsum.photos/seed/sheep2/400/400"
  },
  {
    id: "#0622",
    rfid: "752-039-482-88",
    gender: "公",
    age: "36个月",
    weight: "51.0kg",
    steps: "9,800",
    temp: "38.1°C",
    rumination: "45分钟/小时",
    location: "2号草场",
    image: "https://picsum.photos/seed/sheep3/400/400"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isScanning, setIsScanning] = useState(false);
  const [currentSheep, setCurrentSheep] = useState(SHEEP_DATA[0]);
  const [hasNotification, setHasNotification] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [onlineCount, setOnlineCount] = useState(1284);

  // Simulate real-time online count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate network delay for scanning
    setTimeout(() => {
      const nextIndex = (SHEEP_DATA.findIndex(s => s.id === currentSheep.id) + 1) % SHEEP_DATA.length;
      setCurrentSheep(SHEEP_DATA[nextIndex]);
      setIsScanning(false);
      showToast("识别成功！已同步最新数据");
    }, 1500);
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (action: string) => {
    showToast(`${action}记录已保存`);
  };

  return (
    <div className="min-h-screen pb-24 font-sans bg-background-light dark:bg-background-dark">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium"
          >
            <CheckCircle2 className="size-4 text-primary" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Plus className="text-primary size-6" />
            </motion.div>
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">数字革吉-扩繁场羊只数字化全生命周期系统</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">现场管理系统</p>
          </div>
        </div>
        <button 
          onClick={() => setHasNotification(false)}
          className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 relative transition-colors active:bg-slate-200"
        >
          <Bell className="size-5" />
          {hasNotification && (
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
          )}
        </button>
      </header>

      <main className="p-4 space-y-6">
        {activeTab === 'home' ? (
          <>
            {/* Main Action Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight">快速识别</h2>
              <motion.button 
                onClick={handleScan}
                disabled={isScanning}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary hover:bg-primary/90 text-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 shadow-lg shadow-primary/20 transition-all disabled:opacity-80"
              >
                <div className="size-16 rounded-full bg-white/30 flex items-center justify-center">
                  {isScanning ? (
                    <Loader2 className="size-10 animate-spin" />
                  ) : (
                    <Scan className="size-10" />
                  )}
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold block">
                    {isScanning ? "正在识别中..." : "RFID / 扫码识别羊只"}
                  </span>
                  <span className="text-xs opacity-70">支持远距离RFID感应与条码识别</span>
                </div>
              </motion.button>
            </section>

            {/* Status Cards Grid */}
            <section className="grid grid-cols-2 gap-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setActiveTab('sheep')}
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <Wifi className="text-primary size-5" />
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">在线</span>
                </div>
                <p className="text-2xl font-bold">{onlineCount.toLocaleString()}</p>
                <p className="text-xs text-slate-500">在线羊只总量</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="text-red-500 size-5" />
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-bold">待处理</span>
                </div>
                <p className="text-2xl font-bold text-red-500">08</p>
                <p className="text-xs text-slate-500">异常健康预警</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 col-span-2"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Syringe className="text-primary size-5" />
                  <h3 className="text-sm font-bold">今日防疫任务</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4 space-y-1">
                    <p className="text-xs text-slate-500">口蹄疫疫苗注射</p>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-primary h-full"
                      />
                    </div>
                  </div>
                  <p className="text-sm font-bold whitespace-nowrap">142 / 220</p>
                </div>
              </motion.div>
            </section>

            {/* Simulated Scan Result */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">最后扫描记录</h2>
                <span className="text-xs text-primary font-medium flex items-center gap-1">
                  <span className="size-2 bg-primary rounded-full animate-pulse"></span> 实时同步中
                </span>
              </div>

              <motion.div 
                key={currentSheep.id}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm"
              >
                <div className="p-4 flex gap-4">
                  <img 
                    src={currentSheep.image} 
                    alt="Sheep"
                    referrerPolicy="no-referrer"
                    className="size-24 rounded-xl object-cover bg-slate-100 dark:bg-slate-900"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">白绒山羊 {currentSheep.id}</h3>
                      <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">核心扩繁</span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">RFID 编号: {currentSheep.rfid}</p>
                    <div className="flex gap-2 pt-1">
                      <span className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">{currentSheep.gender} · {currentSheep.age}</span>
                      <span className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">体重: {currentSheep.weight}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 border-y border-slate-100 dark:border-slate-700 divide-x divide-slate-100 dark:divide-slate-700">
                  <div className="p-3 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">步数/日</p>
                    <p className="text-sm font-bold text-primary">{currentSheep.steps}</p>
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">体温</p>
                    <p className="text-sm font-bold">{currentSheep.temp}</p>
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">日均反刍</p>
                    <p className="text-sm font-bold">{currentSheep.rumination}</p>
                  </div>
                </div>

                {/* Location Map Snippet */}
                <div className="p-4 flex items-center gap-3">
                  <div className="size-16 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaHU5ePOtnlgkLPppXin7CFOVbxHcQz2rFAxnPMPyg6y3-bwJIRpnYRmfOpkz5SBuI9H-OsRgRsoRqVBeugsbSrNjoiLI__L1Qmnowf-XN3V35awJm69x4E81WQU-EZWDoF9pyNnnokU8tCkWtt6AuTHlCxkyLPaSc7q7GChlurYDinSgMTdhwviez7sQxz_f4aklLyZYqOMFuVhLufKRfKMcsKQYajJHpu3rMx3ltgIcnNL4l0pOM1jCfba42ley72XJP1cINhJM" 
                      alt="Pasture Map"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 bg-primary rounded-full ring-4 ring-primary/30"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">当前位置: {currentSheep.location}</p>
                    <p className="text-[10px] text-slate-500">32.4812N, 81.2842E (15分钟前更新)</p>
                  </div>
                  <button 
                    onClick={() => showToast(`正在打开${currentSheep.location}地图...`)}
                    className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors active:scale-90"
                  >
                    <MapIcon className="size-5" />
                  </button>
                </div>

                {/* Quick Action Buttons */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 flex gap-2">
                  <button 
                    onClick={() => handleAction("免疫")}
                    className="flex-1 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold flex flex-col items-center justify-center gap-1 shadow-sm active:bg-slate-50 transition-colors"
                  >
                    <Syringe className="size-4 text-primary" />
                    <span>记录免疫</span>
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('health');
                      showToast(`正在进入 ${currentSheep.id} 的健康检查`);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold flex flex-col items-center justify-center gap-1 shadow-sm active:bg-slate-50 transition-colors"
                  >
                    <Stethoscope className="size-4 text-primary" />
                    <span>健康检查</span>
                  </button>
                  <button 
                    onClick={() => handleAction("产绒")}
                    className="flex-1 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold flex flex-col items-center justify-center gap-1 shadow-sm active:bg-slate-50 transition-colors"
                  >
                    <Scissors className="size-4 text-primary" />
                    <span>记录产绒</span>
                  </button>
                </div>
              </motion.div>
            </section>
          </>
        ) : activeTab === 'sheep' ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">羊群列表</h2>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-bold">全部 (1,284)</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {SHEEP_DATA.map((sheep, index) => (
                <motion.div
                  key={sheep.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setCurrentSheep(sheep);
                    setActiveTab('health');
                    showToast(`正在进入 ${sheep.id} 的健康检查`);
                  }}
                  className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <img 
                    src={sheep.image} 
                    alt={sheep.id}
                    referrerPolicy="no-referrer"
                    className="size-16 rounded-lg object-cover bg-slate-100 dark:bg-slate-900"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold">白绒山羊 {sheep.id}</h3>
                      <span className="text-[10px] text-slate-400">{sheep.location}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">{sheep.rfid}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] text-slate-500">{sheep.gender} · {sheep.age}</span>
                      <span className="text-[10px] text-primary font-bold">{sheep.weight}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="size-2 bg-primary rounded-full ml-auto mb-1"></div>
                    <p className="text-[10px] text-slate-400">在线</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ) : activeTab === 'health' ? (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTab('sheep')}
                className="size-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center active:scale-90 transition-transform"
              >
                <Home className="size-5 rotate-[-90deg]" />
              </button>
              <h2 className="text-xl font-bold tracking-tight">健康检测</h2>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src={currentSheep.image} 
                  alt="Sheep"
                  className="size-20 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">白绒山羊 {currentSheep.id}</h3>
                  <p className="text-xs text-slate-500">RFID: {currentSheep.rfid}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] text-slate-500 mb-1">当前体温</p>
                  <p className="text-lg font-bold text-primary">{currentSheep.temp}</p>
                  <p className="text-[10px] text-green-500">正常范围</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] text-slate-500 mb-1">心率</p>
                  <p className="text-lg font-bold text-primary">78 次/分</p>
                  <p className="text-[10px] text-green-500">正常范围</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold">详细指标检测</h4>
                {[
                  { label: "呼吸频率", value: "24 次/分", status: "正常" },
                  { label: "反刍时长", value: currentSheep.rumination, status: "正常" },
                  { label: "运动活跃度", value: "高", status: "良好" },
                  { label: "进食量", value: "2.4kg/日", status: "正常" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                    <span className="text-xs text-slate-600 dark:text-slate-400">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold">{item.value}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-600 rounded-full font-bold">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  showToast("健康报告已生成并同步至云端");
                  setActiveTab('home');
                }}
                className="w-full py-3 bg-primary text-slate-900 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                完成检测并归档
              </button>
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="size-10 animate-spin mb-4 opacity-20" />
            <p className="text-sm">功能开发中，敬请期待...</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <Home className="size-6" />
          <span className="text-[10px] font-bold">首页</span>
        </button>
        <button 
          onClick={() => setActiveTab('sheep')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'sheep' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <ClipboardList className="size-6" />
          <span className="text-[10px]">羊群</span>
        </button>
        <div className="relative -top-6">
          <motion.button 
            onClick={() => showToast("正在添加新记录...")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="size-14 rounded-full bg-primary text-slate-900 shadow-lg shadow-primary/30 flex items-center justify-center"
          >
            <Plus className="size-8" />
          </motion.button>
        </div>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'stats' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <BarChart3 className="size-6" />
          <span className="text-[10px]">统计</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <Settings className="size-6" />
          <span className="text-[10px]">设置</span>
        </button>
      </nav>
    </div>
  );
}
