import { useState, useEffect } from 'react';
import api from '../../config/api.js';

const MessagingPage = () => {
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('messages');
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages();
    } else {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [activeTab]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/messaging/messages');
      const data = response.data?.data;
      // Ensure messages is always an array
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/messaging/notifications');
      const data = response.data?.data;
      // Ensure notifications is always an array
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/messaging/notifications/unread/count');
      setUnreadCount(response.data.data?.count || 0);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/messaging/notifications/read-all');
      await fetchNotifications();
      await fetchUnreadCount();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Messaging & Notifications</h1>
        {activeTab === 'notifications' && unreadCount > 0 && (
          <button onClick={markAllAsRead} className="btn btn-secondary">
            Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notifications'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="card">
          {!Array.isArray(messages) || messages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border rounded-lg ${
                    !message.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">
                        {message.sender?.firstName} {message.sender?.lastName}
                      </p>
                      {message.case && (
                        <p className="text-sm text-gray-600">Case: {message.case.caseNumber}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{message.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="card">
          {!Array.isArray(notifications) || notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No notifications yet</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg ${
                    !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.type}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{notification.message}</p>
                  {notification.link && (
                    <a
                      href={notification.link}
                      className="text-primary-600 hover:underline text-sm mt-2 inline-block"
                    >
                      View Details →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagingPage;

