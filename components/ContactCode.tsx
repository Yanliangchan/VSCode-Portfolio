import styles from '@/styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'yanliangchan.com',
    href: 'https://yanliangchan.com',
  },
  {
    social: 'email',
    link: 'yanliangchan@gmail.com',
    href: 'mailto:yanliangchan@gmail.com',
  },
  {
    social: 'github',
    link: 'yanliangchan',
    href: 'https://github.com/Yanliangchan',
  },
  {
    social: 'linkedin',
    link: 'Chan Yanliang',
    href: 'https://www.linkedin.com/in/yanliangchan/',
  },
  {
    social: 'telegram',
    link: 'yanliangchan',
    href: 'https://t.me/yan1iangchan',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
