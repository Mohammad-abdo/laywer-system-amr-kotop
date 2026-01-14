import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      icon: '🏢',
      title: ' خدمات قانونيه',
      description: 'خدمات قانونيه للأفراد والشركات',
      features: ['حجز الأسماء التجارية', 'إعداد المستندات', 'مساعدة التسجيل', 'إرشادات خطوة بخطوة'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '🏢',
      title: 'استشارات قانونية',
      description: 'صياغة احترافية للعقود القانونية',
      features: ['حجز الأسماء التجارية', 'إعداد المستندات', 'مساعدة التسجيل', 'إرشادات خطوة بخطوة'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '🏢',
      title: 'توكيلات برندات',
      description: 'خدمات متخصصة في توكيلات البرندات',
      features: ['حجز الأسماء التجارية', 'إعداد المستندات', 'مساعدة التسجيل', 'إرشادات خطوة بخطوة'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '🏢',
      title: 'تأسيس الشركات',
      description: 'خدمات شاملة لتأسيس الشركات وتسجيلها',
      features: ['حجز الأسماء التجارية', 'إعداد المستندات', 'مساعدة التسجيل', 'إرشادات خطوة بخطوة'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '📝',
      title: 'صياغة العقود',
      description: 'صياغة احترافية للعقود القانونية',
      features: ['عقود تجارية', 'عقود عمل', 'عقود شراكة', 'مراجعة العقود'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '💰',
      title: 'تحصيل الديون',
      description: 'خدمات متخصصة في تحصيل الديون',
      features: ['تتبع الديون', 'إجراءات قانونية', 'مفاوضات', 'تنفيذ الأحكام'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '📋',
      title: 'خدمات التوثيق',
      description: 'توثيق قانوني معتمد',
      features: ['توثيق العقود', 'توثيق الاتفاقيات', 'شهادات قانونية', 'تصديقات'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '📖',
      title: 'الأوقاف والوصايا',
      description: 'إدارة الأوقاف والوصايا',
      features: ['صياغة الوصايا', 'إدارة الأوقاف', 'تسجيل الوصايا', 'متابعة التنفيذ'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '🏷️',
      title: 'تسجيل العلامات التجارية',
      description: 'حماية علامتك التجارية',
      features: ['بحث العلامات', 'التسجيل', 'تجديد التسجيل', 'حماية العلامات'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '⚖️',
      title: 'التمثيل القانوني',
      description: 'تمثيل قانوني محترف',
      features: ['المرافعة', 'التمثيل في المحاكم', 'المفاوضات', 'التسويات'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '📊',
      title: 'الضرائب',
      description: 'استشارات ضريبية متخصصة',
      features: ['استشارات ضريبية', 'إعداد الإقرارات', 'مراجعة الضرائب', 'تمثيل أمام الهيئات'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
    },
    {
      icon: '🏛️',
      title: 'حوكمة الشركات',
      description: 'حوكمة وإدارة الشركات',
      features: ['هياكل الحوكمة', 'لوائح الشركات', 'امتثال قانوني', 'استشارات إدارية'],
      color: 'from-primary-600 via-primary-500 to-primary-700',
      textColor: 'text-primary-600'
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
              خدماتنا القانونية
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              حلول قانونية شاملة مصممة خصيصًا لتلبية جميع احتياجاتك. فريقنا الخبير جاهز لمساعدتك.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary-400 transform hover:-translate-y-2"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                <div className="p-8 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <svg className={`w-5 h-5 ${service.textColor} ml-3 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`${service.textColor} font-bold hover:opacity-80 inline-flex items-center group`}
                  >
                    ابدأ الآن
                    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">كيف يعمل</h2>
            <p className="text-xl text-gray-600">خطوات بسيطة للحصول على المساعدة القانونية التي تحتاجها</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'تواصل معنا', description: 'اتصل بنا عبر موقعنا أو الهاتف' },
              { step: '02', title: 'استشارة', description: 'احجز استشارة أولية مجانية' },
              { step: '03', title: 'مراجعة القضية', description: 'نراجع قضيتك ونقدم الخيارات' },
              { step: '04', title: 'ابدأ العمل', description: 'ابدأ العمل مع فريقنا الخبير' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">تحتاج مساعدة في اختيار خدمة؟</h2>
            <p className="text-xl text-gray-100 mb-8">
              تواصل معنا للحصول على استشارة مجانية وسنساعدك في العثور على الحل المناسب.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              تواصل معنا اليوم
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
