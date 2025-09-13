import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, QrCode, Search, Download, LogOut, Check, X, TrendingUp, Clock, Eye, Trash2, Mail, Building, MapPin, Hash, BookOpen } from 'lucide-react';

const ForumStampApp = () => {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 'U001',
      region: '서울',
      chapter: '강남',
      email: 'minsu@example.com',
      pin: '1234',
      className: '비즈니스 리더십',
      name: '김민수',
      stamps: [true, true, true, true, true, true, false, false, false, false, false, false],
      registeredDate: '2025-01-15',
      lastAttendance: '2025-09-13 14:30',
      attendanceHistory: [
        { session: 'Session 1 - 리더십의 기본', date: '2025-09-10 09:00', location: 'Hall A' },
        { session: 'Session 2 - 팀 빌딩 전략', date: '2025-09-10 14:00', location: 'Hall B' },
        { session: 'Session 3 - 커뮤니케이션 스킬', date: '2025-09-11 09:00', location: 'Hall A' },
        { session: 'Session 4 - 갈등 관리', date: '2025-09-11 14:00', location: 'Hall C' },
        { session: 'Session 5 - 성과 관리', date: '2025-09-12 09:00', location: 'Hall A' },
        { session: 'Session 6 - 변화 관리', date: '2025-09-12 14:00', location: 'Hall B' },
      ]
    },
    {
      id: 'U002',
      region: '서울',
      chapter: '강남',
      email: 'younghee@example.com',
      pin: '5678',
      className: '디지털 마케팅',
      name: '이영희',
      stamps: [true, true, true, true, true, true, true, true, false, false, false, false],
      registeredDate: '2025-01-20',
      lastAttendance: '2025-09-13 15:00',
      attendanceHistory: []
    },
    {
      id: 'U003',
      region: '부산',
      chapter: '해운대',
      email: 'cheolsu@example.com',
      pin: '9012',
      className: '비즈니스 리더십',
      name: '박철수',
      stamps: [true, true, true, true, false, false, false, false, false, false, false, false],
      registeredDate: '2025-02-01',
      lastAttendance: '2025-09-11 16:00',
      attendanceHistory: []
    },
    {
      id: 'U004',
      region: '대구',
      chapter: '중구',
      email: 'jiwon@example.com',
      pin: '3456',
      className: '데이터 분석',
      name: '최지원',
      stamps: [true, true, true, true, true, true, true, true, true, true, true, true],
      registeredDate: '2025-01-10',
      lastAttendance: '2025-09-13 16:00',
      attendanceHistory: []
    },
    {
      id: 'U005',
      region: '서울',
      chapter: '강북',
      email: 'junho@example.com',
      pin: '7890',
      className: '프로젝트 관리',
      name: '강준호',
      stamps: [true, true, true, true, true, false, false, false, false, false, false, false],
      registeredDate: '2025-01-25',
      lastAttendance: '2025-09-12 11:00',
      attendanceHistory: []
    },
    {
      id: 'ADMIN001',
      region: 'ADMIN',
      chapter: 'ADMIN',
      email: 'admin@forumstamp.com',
      pin: '0000',
      className: 'ADMIN',
      name: '관리자',
      role: 'admin',
      stamps: [],
      registeredDate: '2025-01-01',
      lastAttendance: null,
      attendanceHistory: []
    }
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [currentSession, setCurrentSession] = useState('Session 7');
  const [qrValidTime, setQrValidTime] = useState(873);

  const classOptions = [
    '비즈니스 리더십',
    '디지털 마케팅',
    '데이터 분석',
    '프로젝트 관리',
    '혁신 전략',
    '고객 경험',
    '재무 관리',
    '인사 관리',
    'IT 기술',
    '영업 전략'
  ];

  const LoginView = () => {
    const [region, setRegion] = useState('');
    const [chapter, setChapter] = useState('');
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [className, setClassName] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
      if (region === 'ADMIN' && chapter === 'ADMIN' && email === 'admin@forumstamp.com' && pin === '0000') {
        const adminUser = users.find(u => u.role === 'admin');
        setCurrentUser(adminUser);
        setCurrentView('admin');
        showNotification('관리자 모드로 접속했습니다.', 'success');
        return;
      }

      const user = users.find(u => 
        u.region === region &&
        u.chapter === chapter &&
        u.email === email &&
        u.pin === pin &&
        u.className === className &&
        u.role !== 'admin'
      );

      if (user) {
        setCurrentUser(user);
        setCurrentView('participant');
        showNotification(`환영합니다, ${user.name}님!`, 'success');
      } else {
        setError('입력하신 정보와 일치하는 계정을 찾을 수 없습니다.');
      }
    };

    const handlePinInput = (value) => {
      const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 4);
      setPin(numbersOnly);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">ForumStamp</h1>
            <p className="text-gray-600 mt-2">포럼 출석 관리 시스템</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  지역명
                </label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="예: 서울"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="inline w-4 h-4 mr-1" />
                  챕터명
                </label>
                <input
                  type="text"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="예: 강남"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="inline w-4 h-4 mr-1" />
                PIN (숫자 4자리)
              </label>
              <input
                type="text"
                value={pin}
                onChange={(e) => handlePinInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                placeholder="• • • •"
                maxLength="4"
                inputMode="numeric"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="inline w-4 h-4 mr-1" />
                클래스명
              </label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">클래스를 선택하세요</option>
                {classOptions.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleLogin}
              disabled={!region || !chapter || !email || !pin || !className}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                region && chapter && email && pin && className
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              로그인
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 font-medium">테스트 계정:</p>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="p-2 bg-white rounded border border-gray-200">
                <p className="font-medium text-gray-700 mb-1">참가자 계정</p>
                <p>지역: 서울 / 챕터: 강남</p>
                <p>이메일: minsu@example.com</p>
                <p>PIN: 1234 / 클래스: 비즈니스 리더십</p>
              </div>
              <div className="p-2 bg-white rounded border border-gray-200">
                <p className="font-medium text-gray-700 mb-1">관리자 계정</p>
                <p>지역: ADMIN / 챕터: ADMIN</p>
                <p>이메일: admin@forumstamp.com</p>
                <p>PIN: 0000 / 클래스: 아무거나</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ParticipantView = () => {
    const stampCount = currentUser.stamps.filter(s => s).length;
    const totalStamps = 12;
    const progress = (stampCount / totalStamps) * 100;

    const handleQRScan = () => {
      setShowQRScanner(true);
      setTimeout(() => {
        if (stampCount < totalStamps) {
          const newStamps = [...currentUser.stamps];
          const nextEmpty = newStamps.findIndex(s => !s);
          if (nextEmpty !== -1) {
            newStamps[nextEmpty] = true;
            const updatedUser = { ...currentUser, stamps: newStamps, lastAttendance: new Date().toLocaleString() };
            setCurrentUser(updatedUser);
            setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
            showNotification('✅ 출석 체크 완료!', 'success');
          }
        }
        setShowQRScanner(false);
      }, 2000);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              </div>
              <h1 className="text-xl font-bold text-purple-600">ForumStamp</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.region} • {currentUser.chapter} • {currentUser.className}</p>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentView('login');
                }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-4 space-y-6">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">나의 스탬프 카드</h2>
                <p className="text-purple-200">테크 포럼 2025 - {currentUser.className}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-200">참가 번호</p>
                <p className="text-xl font-mono font-bold">{currentUser.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {currentUser.stamps.map((stamped, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-full flex items-center justify-center transition-all ${
                    stamped
                      ? 'bg-white shadow-lg transform scale-105'
                      : 'bg-purple-500 bg-opacity-30 border-2 border-dashed border-purple-400'
                  }`}
                >
                  {stamped && <Check className="w-8 h-8 text-purple-600" />}
                  {!stamped && <span className="text-purple-300 text-sm font-medium">{index + 1}</span>}
                </div>
              ))}
            </div>

            <div className="bg-purple-800 bg-opacity-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">진행률</span>
                <span className="text-2xl font-bold">{stampCount}/{totalStamps}</span>
              </div>
              <div className="w-full bg-purple-900 bg-opacity-50 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-purple-200 mt-2">
                {totalStamps - stampCount > 0 
                  ? `${totalStamps - stampCount}개 더 모으면 수료증을 받을 수 있습니다!`
                  : '축하합니다! 모든 세션을 완료했습니다!'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">참가자 정보</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">지역</p>
                <p className="font-medium text-gray-900">{currentUser.region}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">챕터</p>
                <p className="font-medium text-gray-900">{currentUser.chapter}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">클래스</p>
                <p className="font-medium text-gray-900">{currentUser.className}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">이메일</p>
                <p className="font-medium text-gray-900">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">등록일</p>
                <p className="font-medium text-gray-900">{currentUser.registeredDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">최근 출석</p>
                <p className="font-medium text-gray-900">{currentUser.lastAttendance || '없음'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleQRScan}
              className="bg-purple-600 text-white p-4 rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              QR 코드 스캔
            </button>
            <button className="bg-white text-gray-700 p-4 rounded-xl font-medium hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              출석 내역
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">출석 기록</h3>
            <div className="space-y-3">
              {currentUser.attendanceHistory.length > 0 ? (
                currentUser.attendanceHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{record.session}</p>
                        <p className="text-sm text-gray-500">{record.location}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{record.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">아직 출석 기록이 없습니다.</p>
              )}
            </div>
          </div>

          {stampCount === totalStamps && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
              <div className="flex items-center gap-4">
                <Award className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-bold mb-1">🎉 축하합니다!</h3>
                  <p>모든 세션에 참석하셨습니다. 리셉션에서 수료증과 기념품을 받아가세요!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {showQRScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">QR 코드 스캔</h3>
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-4 border-purple-600 rounded-xl"></div>
                </div>
                <div className="absolute w-full h-1 bg-purple-600 animate-scan"></div>
                <QrCode className="w-20 h-20 text-gray-400 z-10" />
              </div>
              <button
                onClick={() => setShowQRScanner(false)}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const AdminView = () => {
    const participants = users.filter(u => u.role !== 'admin');
    const totalUsers = participants.length;
    const avgAttendance = participants.reduce((acc, user) => acc + user.stamps.filter(s => s).length, 0) / totalUsers;
    const completedUsers = participants.filter(u => u.stamps.filter(s => s).length === 12).length;
    const activeToday = participants.filter(u => u.lastAttendance && u.lastAttendance.includes('2025-09-13')).length;

    const filteredUsers = participants.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUserClick = (user) => {
      setSelectedUser(user);
      setShowUserModal(true);
    };

    const handleStampToggle = (userId, stampIndex) => {
      setUsers(users.map(user => {
        if (user.id === userId) {
          const newStamps = [...user.stamps];
          newStamps[stampIndex] = !newStamps[stampIndex];
          return { ...user, stamps: newStamps };
        }
        return user;
      }));
      showNotification('스탬프 상태가 업데이트되었습니다.', 'success');
    };

    const handleDeleteUser = (userId) => {
      if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
        setUsers(users.filter(u => u.id !== userId));
        setShowUserModal(false);
        showNotification('사용자가 삭제되었습니다.', 'success');
      }
    };

    const exportData = () => {
      const csvContent = participants
        .map(u => `${u.id},${u.name},${u.email},${u.region},${u.chapter},${u.className},${u.stamps.filter(s => s).length}/12`)
        .join('\n');
      showNotification('📥 데이터를 내보냈습니다.', 'success');
    };

    const regionStats = {};
    participants.forEach(user => {
      if (!regionStats[user.region]) {
        regionStats[user.region] = { total: 0, avgStamps: 0, users: [] };
      }
      regionStats[user.region].total++;
      regionStats[user.region].users.push(user);
    });

    Object.keys(regionStats).forEach(region => {
      const totalStamps = regionStats[region].users.reduce((acc, u) => acc + u.stamps.filter(s => s).length, 0);
      regionStats[region].avgStamps = (totalStamps / regionStats[region].total).toFixed(1);
    });

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              </div>
              <h1 className="text-xl font-bold text-purple-600">ForumStamp Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">관리자 모드</span>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentView('login');
                }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-purple-600" />
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              <p className="text-sm text-gray-500 mt-1">총 참가자</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {avgAttendance.toFixed(1)}/12
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{((avgAttendance/12)*100).toFixed(0)}%</p>
              <p className="text-sm text-gray-500 mt-1">평균 출석률</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
                <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                  {((completedUsers/totalUsers)*100).toFixed(0)}%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{completedUsers}</p>
              <p className="text-sm text-gray-500 mt-1">완료자</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-green-600" />
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">오늘</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{activeToday}</p>
              <p className="text-sm text-gray-500 mt-1">오늘 활동</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">지역별 현황</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(regionStats).map(([region, stats]) => (
                <div key={region} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{region}</span>
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{stats.total}명</p>
                  <p className="text-sm text-gray-500">평균 {stats.avgStamps}개 스탬프</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-lg font-bold text-gray-900">참가자 관리</h2>
                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-initial">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="검색 (이름, 이메일, 지역, 챕터, 클래스)"
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-96 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={exportData}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    내보내기
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">참가자</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">지역/챕터</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">클래스</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">출석률</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">진행 상태</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">최근 출석</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => {
                    const stampCount = user.stamps.filter(s => s).length;
                    const progress = (stampCount / 12) * 100;
                    return (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 font-medium">{user.name[0]}</span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">{user.region}</p>
                          <p className="text-xs text-gray-500">{user.chapter}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.className}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{stampCount}/12</span>
                            <span className="ml-2 text-sm text-gray-500">({progress.toFixed(0)}%)</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                progress === 100 ? 'bg-green-500' : progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastAttendance || '없음'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleUserClick(user)}
                            className="text-purple-600 hover:text-purple-900 transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">세션 QR 코드 관리</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center">
                <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-gray-400" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">현재 세션</label>
                  <select
                    value={currentSession}
                    onChange={(e) => setCurrentSession(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={`Session ${i + 1}`}>Session {i + 1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">유효 시간</label>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.floor(qrValidTime / 60)}:{(qrValidTime % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  새 QR 코드 생성
                </button>
              </div>
            </div>
          </div>
        </div>

        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900">참가자 상세 정보</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">이름</p>
                    <p className="font-medium text-gray-900">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ID</p>
                    <p className="font-medium text-gray-900">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">이메일</p>
                    <p className="font-medium text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">지역/챕터</p>
                    <p className="font-medium text-gray-900">{selectedUser.region} / {selectedUser.chapter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">클래스</p>
                    <p className="font-medium text-gray-900">{selectedUser.className}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">등록일</p>
                    <p className="font-medium text-gray-900">{selectedUser.registeredDate}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">스탬프 관리 (클릭하여 수정)</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {selectedUser.stamps.map((stamped, index) => (
                      <button
                        key={index}
                        onClick={() => handleStampToggle(selectedUser.id, index)}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all ${
                          stamped
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {stamped ? <Check className="w-6 h-6" /> : <span className="text-lg font-medium">{index + 1}</span>}
                        <span className="text-xs mt-1">Session {index + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    이메일 발송
                  </button>
                  <button
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setQrValidTime(prev => prev > 0 ? prev - 1 : 900);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {currentView === 'login' && <LoginView />}
      {currentView === 'participant' && <ParticipantView />}
      {currentView === 'admin' && <AdminView />}

      {notification && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all transform ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        } text-white z-50`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ForumStampApp;

