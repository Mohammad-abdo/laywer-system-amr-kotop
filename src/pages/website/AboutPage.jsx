import { Link } from 'react-router-dom';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'د. محفوظ بن مرعي بن محفوظ',
      role: 'الشريك المؤسس / رئيس مجلس الإدارة',
      experience: '15+ سنوات'
    },
    {
      name: 'المحامي: يوسف بن صالح الزهراني',
      role: 'الشريك المؤسس / المدير العام',
      experience: '12+ سنوات'
    },
    {
      name: 'ماجد بن عادل المفرجی',
      role: 'محامٍ',
      experience: '10+ سنوات'
    },
    {
      name: 'مصطفى بهاء الدين',
      role: 'مستشار قانوني',
      experience: '8+ سنوات'
    },
    {
      name: 'محمد علي الشيخ',
      role: 'مستشار قانوني',
      experience: '7+ سنوات'
    },
    {
      name: 'مهند باجحلان',
      role: 'إدارة العقود',
      experience: '5+ سنوات'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'النزاهة',
      description: 'نحافظ على أعلى المعايير الأخلاقية في جميع تعاملاتنا مع العملاء والزملاء.'
    },
    {
      icon: '⭐',
      title: 'التميز',
      description: 'نسعى للتميز في كل جانب من جوانب تقديم الخدمات وتمثيل العملاء.'
    },
    {
      icon: '🤝',
      title: 'التركيز على العميل',
      description: 'نجاح ورضا عملائنا هو أولويتنا القصوى في كل ما نقوم به.'
    },
    {
      icon: '💡',
      title: 'الابتكار',
      description: 'نستفيد من التكنولوجيا الحديثة والنهج المبتكرة لتحسين خدماتنا.'
    }
  ];

  return (
    <div dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white min-h-[500px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-900/95"></div>
        </div>
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              نبذة عنا
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              ملتزمون بتقديم خدمات قانونية استثنائية مع النزاهة والخبرة والابتكار.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-amber-600">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">رسالتنا</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                نحن ملتزمون بتقديم خدمات قانونية استثنائية لعملائنا. مهمتنا هي تقديم حلول قانونية احترافية وفعالة وموثوقة تساعد عملائنا على تحقيق أهدافهم مع الحفاظ على أعلى معايير النزاهة والتميز. نؤمن ببناء علاقات طويلة الأمد قائمة على الثقة والشفافية والنتائج المتميزة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">فريق العمل</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              فريقنا يتكون من محامين ومستشارين قانونيين مؤهلين وذوي خبرة مكرسين لخدمة عملائنا.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {member.name.split(' ')[0][0]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-amber-600 font-semibold mb-2">{member.role}</p>
                <div className="inline-block px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-medium">
                  {member.experience}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">15+</div>
              <div className="text-gray-700 font-medium">سنوات الخبرة</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-gray-700 font-medium">قضية فاز بها</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">1000+</div>
              <div className="text-gray-700 font-medium">عميل سعيد</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">98%</div>
              <div className="text-gray-700 font-medium">معدل النجاح</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">قيمنا الأساسية</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              المبادئ التي توجه كل ما نقوم به
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-6xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">مستعد للعمل معنا؟</h2>
            <p className="text-xl text-amber-100 mb-8">
              تواصل معنا اليوم للحصول على استشارة واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك القانونية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-amber-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                تواصل معنا
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 bg-amber-800/50 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-lg hover:bg-amber-800/70 transition-all"
              >
                عرض الخدمات
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
