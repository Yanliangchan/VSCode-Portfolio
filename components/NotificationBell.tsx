'use client';

import { useState, useEffect, useRef } from 'react';
import { VscBell, VscBellDot } from 'react-icons/vsc';

import styles from '@/styles/NotificationBell.module.css';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'welcome',
      message:
        'Welcome! Try Ctrl+Shift+P for commands, or Ctrl+P to jump to a file.',
      read: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAdd = (e: Event) => {
      const detail = (e as CustomEvent<{ message: string }>).detail;
      if (!detail?.message) return;
      setNotifications((prev) => [
        { id: `${Date.now()}`, message: detail.message, read: false },
        ...prev,
      ]);
    };

    window.addEventListener('add-notification', handleAdd);
    return () => window.removeEventListener('add-notification', handleAdd);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setNotifications((current) => current.map((n) => ({ ...n, read: true })));
      }
      return next;
    });
  };

  const clearAll = () => setNotifications([]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.trigger} onClick={toggleOpen} title="Notifications">
        {unreadCount > 0 ? <VscBellDot /> : <VscBell />}
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </div>
      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span>Notifications</span>
            {notifications.length > 0 && (
              <button className={styles.clearButton} onClick={clearAll}>
                Clear All
              </button>
            )}
          </div>
          <div className={styles.list}>
            {notifications.length === 0 ? (
              <div className={styles.empty}>No new notifications</div>
            ) : (
              notifications.map((n) => (
                <div className={styles.item} key={n.id}>
                  {n.message}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
