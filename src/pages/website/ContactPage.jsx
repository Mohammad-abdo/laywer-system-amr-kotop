import { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consultationType: 'online'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', consultationType: 'online' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'العنوان',
      content: '3 مكرم عبيد , مدينة نصر , القاهرة , مصر'
    },
    {
      icon: '📧',
      title: 'البريد الإلكتروني',
      content: 'info@meezan-law.com'
    },
    {
      icon: '📞',
      title: 'الهاتف',
      content: '+201000000000\n+201000000000'
    },
    {
      icon: '🕒',
      title: 'ساعات العمل',
      content: 'الأحد - الخميس: 9:00 صباحًا - 5:00 مساءً\nالجمعة - السبت: مغلق'
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
              تواصل معنا
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              لديك سؤال أو تحتاج مساعدة؟ نحن هنا لمساعدتك. تواصل معنا اليوم ودعنا نناقش كيف يمكننا مساعدتك.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white -mt-12 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-r-4 border-amber-600"
                >
                  <div className="flex items-start">
                    <div className="text-4xl ml-4">{info.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line leading-relaxed">{info.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Media */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-lg p-6 border border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">تابعنا</h3>
                <div className="flex space-x-4 space-x-reverse">
                  <a href="#" className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center text-white hover:bg-amber-700 transition-colors shadow-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center text-white hover:bg-amber-700 transition-colors shadow-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center text-white hover:bg-amber-700 transition-colors shadow-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">أرسل لنا رسالة</h2>
                <p className="text-gray-600 mb-8">املأ النموذج أدناه وسنعاود الاتصال بك في أقرب وقت ممكن.</p>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    ✓ شكرًا لرسالتك! سنعاود الاتصال بك قريبًا.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        الاسم الكامل <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                        placeholder="+201000000000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        نوع الاستشارة
                      </label>
                      <select
                        name="consultationType"
                        value={formData.consultationType}
                        onChange={handleChange}
                        className="input"
                      >
                        <option value="online">استشارة عبر الإنترنت</option>
                        <option value="phone">استشارة هاتفية</option>
                        <option value="office">زيارة المكتب</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      الموضوع <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="ما هو موضوع استفسارك؟"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      الرسالة <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="input resize-none"
                      placeholder="أخبرنا عن احتياجاتك القانونية..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white font-bold rounded-lg hover:from-amber-800 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">🗺️</div>
              <p className="text-gray-600 text-lg">خريطة تفاعلية قريبًا</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
