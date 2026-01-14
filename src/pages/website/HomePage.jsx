import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="overflow-hidden" dir="rtl">
      {/* Hero Section - Large Background Image with Overlay Text */}
      <section className="relative bg-gray-900 text-white min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-900/95"></div>
        </div>
        
        {/* Content */}
        <div className="container-custom relative z-10 py-24">
          <div className="max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              عمرو قطب للمحاماة والاستشارات القانونية
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 leading-relaxed  text-center max-w-4xl drop-shadow-md">
              تفخر شركتنا بكونها الشريك القانوني الموثوق للشركات الكبرى 
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 leading-relaxed  text-center max-w-4xl drop-shadow-md">
              نسعى دائمًا لحماية مصالحكم بتقديم استشارات قانونية متخصصة ترتقي لمستوى تطلعاتكم
            </p>
            <div className="flex flex-col items-center justify-center text-center sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="inline-block px-8  py-4 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 hover:from-primary-800 hover:to-primary-900 text-white font-bold rounded-lg shadow-xl shadow-primary-900/50 hover:shadow-2xl transition-all transform hover:-translate-y-1 text-center text-lg"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
      </section>

      {/* Vision, Mission, About Cards - Overlapping Cards Style */}
      <section className="py-20 bg-white -mt-20 relative z-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Vision Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-primary-600 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">رؤيتنا</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                أن نكون الخيار الأول في مجال المحاماة والاستشارات القانونية على المستويات المحلية والإقليمية والدولية، من خلال تقديم خدمات قانونية مبتكرة قائمة على العدالة وأعلى معايير الاحترافية.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-primary-600 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">رسالتنا</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                تمكين عملائنا من اتخاذ قرارات قانونية سليمة من خلال تقديم استشارات مبتكرة تحقق العدالة وتعزز الثقافة القانونية، مما يسهم في خلق بيئة قانونية أكثر وعيًا وفعالية.
              </p>
            </div>

            {/* About Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-primary-600 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">من نحن</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                يعد عمرو قطب للمحاماة والاستشارات القانونية كيانًا قانونيًا يقدم خدمات قانونية مهنية وشاملة للأفراد والشركات. نحقق ذلك من خلال فريق متخصص وخبير ملتزم بالعدالة ويسعى لتقديم أفضل الحلول القانونية بكفاءة واحترافية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Dark Background with Blurred Image */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white overflow-hidden">
        {/* Blurred Background Image */}
        <div 
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              15 عامًا من الخبرة في حلول الأنظمة المتكاملة
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              لأكثر من 15 عامًا، قدم <strong className="text-primary-900"> عمرو قطب للمحاماة والاستشارات القانونية</strong> حلولًا قانونية مبتكرة وموثوقة وفعّالة للأفراد والشركات — مع ضمان الدقة والكفاءة والتميز في كل مشروع.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-info-400 mb-4 drop-shadow-lg">10+</div>
              <div className="text-gray-300 text-lg font-medium">عدد العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-info-400 mb-4 drop-shadow-lg">643+</div>
              <div className="text-gray-300 text-lg font-medium">الاستشارات القانونية</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-info-400 mb-4 drop-shadow-lg">220+</div>
              <div className="text-gray-300 text-lg font-medium">عدد القضايا</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-info-400 mb-4 drop-shadow-lg">58+</div>
              <div className="text-gray-300 text-lg font-medium">عدد العقود</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - 3x3 Grid with Gold Icons */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              خدماتنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              حلول قانونية متكاملة توضع خصيصًا لحماية مصالحكم وتعزيز قوة أعمالكم
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: '🏢', title: ' خدمات قانونيه', desc: 'خدمات قانونيه للأفراد والشركات' },
              { icon: '📝', title: ' استشارات قانونية', desc: 'صياغة احترافية للعقود القانونية' },
              { icon: '💰', title: 'توكيلات برندات', desc: 'خدمات متخصصة في توكيلات البرندات' },
              // { icon: '📋', title: 'خدمات التوثيق', desc: 'توثيق قانوني معتمد' },
              // { icon: '📖', title: 'الأوقاف والوصايا', desc: 'إدارة الأوقاف والوصايا' },
              // { icon: '🏷️', title: 'تسجيل العلامات التجارية', desc: 'حماية علامتك التجارية' },
              // { icon: '⚖️', title: 'التمثيل القانوني', desc: 'تمثيل قانوني محترف' },
              // { icon: '📊', title: 'الضرائب', desc: 'استشارات ضريبية متخصصة' },
              // { icon: '🏛️', title: 'حوكمة الشركات', desc: 'حوكمة وإدارة الشركات' },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary-400 cursor-pointer transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              عرض المزيد
            </Link>
          </div>
        </div>
      </section>

      {/* Licenses & Accreditations Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              التراخيص والاعتمادات
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6, ].map((item) => (
              <div
                key={item}
                className="bg-gray-100 rounded-lg p-6 h-32 flex items-center justify-center hover:bg-gray-200 transition-colors border-2 border-gray-200 hover:border-primary-400 cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400 mb-2">اعتماد</div>
                  <div className="text-xs text-gray-500">Logo {item}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              فريق العمل
            </h2>
            <p className="text-xl text-gray-600">
              فريق متخصص من المحامين والمستشارين القانونيين
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: 'د. محفوظ بن مرعي بن محفوظ', role: 'الشريك المؤسس / رئيس مجلس الإدارة' },
              { name: 'المحامي: يوسف بن صالح الزهراني', role: 'الشريك المؤسس / المدير العام' },
              { name: 'ماجد بن عادل المفرجی', role: 'محامٍ' },
              { name: 'مصطفى بهاء الدين', role: 'مستشار قانوني' },
              { name: 'محمد علي الشيخ', role: 'مستشار قانوني' },
              { name: 'مهند باجحلان', role: 'إدارة العقود' },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center transform hover:-translate-y-2"
              >
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {member.name.split(' ')[0][0]}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-0">مدونتنا</h2>
            <Link
              to="/blog"
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              عرض المزيد
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'مرحبًا أيها العالم!', date: 'نوفمبر 6, 2025' },
              { title: 'قانوني', date: 'نوفمبر 6, 2025' },
              { title: 'السعودية', date: 'نوفمبر 6, 2025' },
            ].map((post, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 text-white hover:bg-slate-700 transition-all cursor-pointer transform hover:-translate-y-2 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{post.date}</p>
                <Link to="/blog" className="text-info-400 hover:text-amber-300 font-medium inline-flex items-center">
                  قراء المزيد
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              مستعد للبدء؟
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              تواصل معنا اليوم للحصول على استشارة مجانية ودعنا نساعدك في احتياجاتك القانونية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
              >
                احجز استشارة
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 bg-primary-800/50 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-lg hover:bg-primary-800/70 transition-all text-lg"
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

export default HomePage;
