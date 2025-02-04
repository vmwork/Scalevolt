<template>
  <footer class="site-footer">
    <div class="footer-container">
      <!-- Help & Contact Section -->
      <div class="footer-section">
        <h3>Продукти</h3>
        <ul>
          <li><a href="#">Розпродаж</a></li>
          <li>
  <router-link to="/Sets-of-solar-power-plants">
    Сонячні набори
  </router-link>
</li>

          <li><a href="#">Акумулятори</a></li>
          <li><a href="#">Інвертори</a></li>
          <li><a href="#">Підтримка клієнтів</a></li>
        </ul>
      </div>

      <!-- About Us Section -->
      <div class="footer-section">
        <h3>Про Нас</h3>
        <ul>
          <li><a href="#">Компанія</a></li>
          <li><a href="#">Наша Команда</a></li>
          <li><a href="#"></a></li>
        </ul>
      </div>

      <!-- Policies Section -->
      <div class="footer-section">
        <h3>Підтримка</h3>
        <ul>
          <li><a href="#">Запитання й відповіді</a></li>
          <li><a href="#">Доставка/Гарантія/Повернення</a></li>
          <li><a href="#">Підтримка клієнтів</a></li>
        </ul>
      </div>

      <!-- Brand Promises / Advantages -->
      <div class="footer-section">
        <h3>Кар'єра</h3>
        <ul class="promises-list">
          <li>Вакансії</li>
        </ul>
      </div>

      <!-- Social Media & Apps -->
      <div class="footer-section">
        <h3>Слідкуйте за нами</h3>
        <div class="social-icons">
          <a href="#" aria-label="Telegram">
            <img src="/images/Footer/telegram-icon.svg" alt="Telegram">
          </a>
          <a href="#" aria-label="Instagram">
            <img src="/images/Footer/instagram-icon.svg" alt="Instagram">
          </a>
          <a href="#" aria-label="Youtube">
            <img src="/images/Footer/youtube-icon.svg" alt="Youtube">
          </a>
        </div>
      </div>
    </div> <!-- Close the footer-container here -->

    <div class="footer-bottom">
      <span>&copy; {{ new Date().getFullYear() }} SCALEVOLT. All rights reserved.</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.site-footer {
  background-color: #333;
  color: #ffffff;
  font-size: 14px;
  padding: 20px;
  width: 100%;       /* Ensure full width */
  margin: 0;         /* Remove default margins if any */
  box-sizing: border-box;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;       /* Ensure the inner container also spans full width */
}

@media (max-width: 800px) {
  .footer-section {
    flex: 1 1 100%;
  }

  .footer-container {
    justify-content: flex-start;
  }
}


.footer-section {
  flex: 1 1 180px;
  margin: 10px;
}

.footer-section h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #ffffff;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #ffffff;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

.footer-section ul li a:hover {
  opacity: 1;
  text-decoration: underline;
}

/* Promises List styling */
.promises-list li {
  margin-bottom: 8px;
}

/* Social Icons */
.social-icons a {
  display: inline-block;
  margin-right: 10px;
}

.social-icons img {
  width: 24px;
  height: 24px;
}

/* Footer bottom */
.footer-bottom {
  border-top: 1px solid #444;
  padding-top: 10px;
  text-align: center;
  font-size: 13px;
  opacity: 0.8;
}

/* Responsive Adjustments */
@media (max-width: 800px) {
  .footer-section {
    flex: 1 1 100%;
  }
  .footer-container {
    justify-content: flex-start;
  }
}
</style>
