# 🌟 Kişisel Blog - Dark Theme

Modern, şık ve responsive bir kişisel blog sitesi. GitHub Pages üzerinde barındırılmak üzere tasarlanmış, karanlık tema kullanan, tamamen statik bir web sitesi.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Demo](#-demo)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Özelleştirme](#-özelleştirme)
- [Dosya Yapısı](#-dosya-yapısı)
- [Teknolojiler](#-teknolojiler)
- [SEO](#-seo)
- [Lisans](#-lisans)

## ✨ Özellikler

### 🎨 Tasarım
- **Karanlık Tema**: GitHub tarzı modern karanlık tema
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Smooth Animasyonlar**: Yumuşak geçişler ve hover efektleri
- **Modern UI/UX**: Kullanıcı dostu arayüz

### 📝 Blog Özellikleri
- **Blog Listesi**: Kategorize edilmiş blog yazıları
- **Arama Fonksiyonu**: Blog yazılarında hızlı arama
- **Filtreleme**: Kategori ve tarih bazlı filtreleme
- **Sayfalama**: Otomatik pagination sistemi
- **Okuma Süresi**: Her yazı için tahmini okuma süresi

### 📱 Sayfalar
- **Ana Sayfa**: Hero section, son yazılar, hakkımda özeti
- **Blog**: Tüm blog yazılarının listelendiği sayfa
- **Hakkımda**: Detaylı biyografi, yetenekler, ilgi alanları
- **İletişim**: İletişim formu ve sosyal medya linkleri
- **404**: Özel hata sayfası

### 🛠 Teknik Özellikler
- **SEO Optimizasyonu**: Meta tags, Open Graph, structured data
- **Performance**: Optimize edilmiş CSS ve JavaScript
- **Accessibility**: ARIA labels, semantic HTML
- **Cross-browser**: Tüm modern tarayıcılarda uyumlu

## 🚀 Demo

[Demo Siteyi Görüntüle](https://username.github.io/personal-blog)

## 📦 Kurulum

### 1. Repository'yi Fork veya Clone Yapın

```bash
git clone https://github.com/username/personal-blog.git
cd personal-blog
```

### 2. Dosyaları Özelleştirin

#### Kişisel Bilgilerinizi Güncelleyin:
- Tüm HTML dosyalarında `Ad Soyad` yerine kendi adınızı yazın
- `email@example.com` yerine kendi email adresinizi yazın
- Sosyal medya linklerini kendi profillerinizle değiştirin

#### EmailJS Entegrasyonu (İletişim Formu):
1. [EmailJS](https://www.emailjs.com/) hesabı oluşturun
2. Bir email servisi ekleyin
3. Bir email template oluşturun
4. `contact.html` dosyasında `YOUR_PUBLIC_KEY` yerine kendi public key'inizi ekleyin:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

### 3. GitHub Pages'te Yayınlayın

1. GitHub'da yeni bir repository oluşturun
2. Dosyaları push edin:

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. GitHub repository ayarlarından:
   - Settings > Pages bölümüne gidin
   - Source olarak "Deploy from a branch" seçin
   - Branch olarak "main" ve klasör olarak "/ (root)" seçin
   - Save butonuna tıklayın

4. Birkaç dakika sonra siteniz `https://YOUR_USERNAME.github.io/YOUR_REPO` adresinde yayında olacak

## 🎯 Kullanım

### Blog Yazısı Ekleme

`js/main.js` dosyasındaki `blogPosts` dizisine yeni yazı ekleyin:

```javascript
{
    id: 9,
    title: "Yeni Blog Yazısı Başlığı",
    excerpt: "Blog yazısının kısa açıklaması...",
    category: "teknoloji", // teknoloji, yazilim, lise-hayati, kitap-film, kisisel
    date: "2024-01-20",
    readingTime: 5, // dakika cinsinden okuma süresi
    image: "https://picsum.photos/400/250?random=9",
    slug: "yeni-blog-yazisi"
}
```

### Kategori Ekleme

`blog.html` dosyasındaki select elementine yeni option ekleyin:

```html
<option value="yeni-kategori">Yeni Kategori</option>
```

### Renk Teması Değiştirme

`css/main.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --bg-primary: #0d1117;  /* Ana arkaplan rengi */
    --text-primary: #f0f6fc; /* Ana metin rengi */
    --text-link: #58a6ff;    /* Link rengi */
    /* ... diğer renkler */
}
```

## 📁 Dosya Yapısı

```
personal-blog/
│
├── index.html              # Ana sayfa
├── blog.html               # Blog listesi sayfası
├── about.html              # Hakkımda sayfası
├── contact.html            # İletişim sayfası
├── 404.html               # 404 hata sayfası
│
├── css/
│   ├── main.css           # Ana stil dosyası
│   └── responsive.css     # Responsive stiller
│
├── js/
│   ├── main.js            # Ana JavaScript dosyası
│   └── blog.js            # Blog sayfası işlevleri
│
├── images/                # Görsel dosyaları
│   └── avatar.jpg         # Profil fotoğrafı
│
├── blog-posts/            # Blog yazıları (gelecek özellik)
│
└── README.md              # Dokümantasyon
```

## 🛠 Teknolojiler

- **HTML5**: Semantic markup
- **CSS3**: Modern styling, CSS Grid, Flexbox
- **JavaScript**: Vanilla JS, ES6+
- **Font Awesome**: İkonlar
- **Google Fonts**: Inter ve Fira Code fontları
- **EmailJS**: Form submission (opsiyonel)
- **GitHub Pages**: Hosting

## 📊 SEO

Site aşağıdaki SEO optimizasyonlarını içerir:

- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD)
- ✅ Semantic HTML5
- ✅ Alt texts for images
- ✅ Sitemap (eklenebilir)
- ✅ Robots.txt (eklenebilir)

## 🚧 Gelecek Özellikler

- [ ] Blog yazılarını Markdown dosyalarından okuma
- [ ] Yorum sistemi (Disqus entegrasyonu)
- [ ] Newsletter abonelik sistemi
- [ ] RSS feed
- [ ] Çoklu dil desteği
- [ ] Light/Dark mode toggle
- [ ] PWA desteği
- [ ] Blog yazıları için tag sistemi

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Herhangi bir öneri veya hata bildirimi için:

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

## 💌 İletişim

- **Email**: email@example.com
- **GitHub**: [@username](https://github.com/username)
- **Twitter**: [@username](https://twitter.com/username)
- **LinkedIn**: [username](https://linkedin.com/in/username)

## 🙏 Teşekkürler

- [GitHub Pages](https://pages.github.com/) - Ücretsiz hosting
- [Font Awesome](https://fontawesome.com/) - İkonlar
- [Google Fonts](https://fonts.google.com/) - Fontlar
- [Lorem Picsum](https://picsum.photos/) - Placeholder görseller

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

Made with ❤️ by [Ad Soyad](https://github.com/username)