import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../config/api.js';
import {
  FiFolder,
  FiMessageSquare,
  FiCalendar,
  FiCheckSquare,
  FiTrendingUp,
  FiArrowRight,
} from 'react-icons/fi';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState({
    cases: { total: 0, active: 0 },
    consultations: { total: 0, pending: 0 },
    appointments: { total: 0, upcoming: 0 },
    tasks: { total: 0, pending: 0 },
  });
  const [recentCases, setRecentCases] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, casesRes, appointmentsRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/recent-cases?limit=5'),
        api.get('/dashboard/upcoming-appointments?limit=5'),
      ]);

      setStats(statsRes.data.data || stats);
      setRecentCases(Array.isArray(casesRes.data.data) ? casesRes.data.data : []);
      setUpcomingAppointments(
        Array.isArray(appointmentsRes.data.data) ? appointmentsRes.data.data : []
      );
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Cases',
      value: stats.cases.total,
      subLabel: `${stats.cases.active} active`,
      icon: FiFolder,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      link: '/admin/cases',
      trend: stats.cases.active > 0 ? 'up' : 'neutral',
    },
    {
      label: 'Consultations',
      value: stats.consultations.total,
      subLabel: `${stats.consultations.pending} pending`,
      icon: FiMessageSquare,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      link: '/admin/consultations',
      trend: stats.consultations.pending > 0 ? 'up' : 'neutral',
    },
    {
      label: 'Appointments',
      value: stats.appointments.total,
      subLabel: `${stats.appointments.upcoming} upcoming`,
      icon: FiCalendar,
      color: 'from-info-500 to-info-600',
      bgColor: 'bg-info-50',
      iconColor: 'text-info-600',
      link: '/admin/appointments',
      trend: stats.appointments.upcoming > 0 ? 'up' : 'neutral',
    },
    {
      label: 'Tasks',
      value: stats.tasks.total,
      subLabel: `${stats.tasks.pending} pending`,
      icon: FiCheckSquare,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      link: '/admin/tasks',
      trend: stats.tasks.pending > 0 ? 'up' : 'neutral',
    },
  ];

  // Chart data
  const caseStatusData = [
    { name: 'Active', value: stats.cases.active, color: '#3B82F6' },
    { name: 'Pending', value: stats.cases.total - stats.cases.active, color: '#F59E0B' },
  ];

  const activityData = [
    { name: 'Mon', cases: stats.cases.total || 0, consultations: stats.consultations.total || 0 },
    { name: 'Tue', cases: 0, consultations: 0 },
    { name: 'Wed', cases: 0, consultations: 0 },
    { name: 'Thu', cases: 0, consultations: 0 },
    { name: 'Fri', cases: 0, consultations: 0 },
    { name: 'Sat', cases: 0, consultations: 0 },
    { name: 'Sun', cases: 0, consultations: 0 },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <motion.a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Visit Website</span>
            <FiArrowRight />
          </motion.a>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={stat.link}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 block"
              >
                {/* Animated Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>

                {/* Decorative Shapes */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-xl"></div>

                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className={`${stat.iconColor} text-2xl`} />
                    </motion.div>
                    {stat.trend === 'up' && (
                      <motion.div
                        className="text-green-500"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FiTrendingUp className="text-xl" />
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                    <motion.p
                      className="text-3xl font-bold text-gray-900 mb-1"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-xs text-gray-500">{stat.subLabel}</p>
                  </div>
                  <motion.div
                    className="mt-4 flex items-center text-sm font-medium text-gray-600 group-hover:text-primary-600 transition-colors"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <span>View details</span>
                    <FiArrowRight className="ml-2" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Case Status Chart */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Case Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={caseStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {caseStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity Chart */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar
                dataKey="cases"
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
                animationBegin={0}
                animationDuration={1000}
              />
              <Bar
                dataKey="consultations"
                fill="#10B981"
                radius={[8, 8, 0, 0]}
                animationBegin={200}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Recent Cases */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Cases</h2>
            <Link
              to="/admin/cases"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center group"
            >
              View All
              <motion.div whileHover={{ x: 5 }}>
                <FiArrowRight className="ml-1" />
              </motion.div>
            </Link>
          </div>
          <div className="space-y-4">
            {recentCases.length === 0 ? (
              <div className="text-center py-8">
                <FiFolder className="mx-auto text-4xl text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">No recent cases</p>
              </div>
            ) : (
              recentCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/admin/cases/${caseItem.id}`}
                    className="block p-4 border border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <FiFolder className="text-primary-600 mr-2" />
                          </motion.div>
                          <p className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {caseItem.title}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {caseItem.client?.firstName} {caseItem.client?.lastName}
                        </p>
                        <p className="text-xs text-gray-400">Case #{caseItem.caseNumber}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                        {formatDate(caseItem.createdAt)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
            <Link
              to="/admin/appointments"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center group"
            >
              View All
              <motion.div whileHover={{ x: 5 }}>
                <FiArrowRight className="ml-1" />
              </motion.div>
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <FiCalendar className="mx-auto text-4xl text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">No upcoming appointments</p>
              </div>
            ) : (
              upcomingAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/admin/appointments/${appointment.id}`}
                    className="block p-4 border border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <FiCalendar className="text-primary-600 mr-2" />
                          </motion.div>
                          <p className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {appointment.title || 'Appointment'}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {appointment.user?.firstName} {appointment.user?.lastName}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                        {formatDateTime(appointment.startTime)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
