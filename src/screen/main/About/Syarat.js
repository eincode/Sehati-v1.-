import React, { Component } from 'react'
import { WebView, StyleSheet, View, ScrollView } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview';

const content = `<html>
<body>
    <p>Dengan menggunakan dan melakukan pendaftaran dengan kami, Anda dianggap telah membaca, memahami dan menyetujui  Tata Cara Penggunaan dan Perjanjian Kerahasiaan yang ada di dalam aplikasi seluler kami.</p>
    <p>Anda juga dianggap telah menyetujui ketentuan sebagai berikut:</p>
    <p>Konten yang berasal dari aplikasi seluler Sehati seperti: teks, grafis, dan foto yang diperoleh dari pemberi lisensi Sehati, maupun materi lain yang terdapat pada aplikasi seluler Sehati semata-mata ditujukan sebagai pemberian informasi. Konten ini tidak dimaksudkan untuk menjadi pengganti saran medis profesional yang meliputi pemberian diagnosis maupun penanganan suatu penyakit. Setiap penentuan kepastian diagnosis dan pemberian terapi pada suatu penyakit harus melalui pemeriksaan secara langsung oleh dokter. Anda tidak diperbolehkan mengabaikan saran medis profesional dari dokter atau menunda mencari pertolongan secara langsung kepada dokter setelah mendapatkan informasi dari di aplikasi seluler.</p>
    <p>Jika Anda berada dalam keadaan darurat medis, segera hubungi layanan kesehatan terdekat atau dokter Anda ataupun kontak darurat 118. Sehati tidak merekomendasikan secara langsung tentang layanan kesehatan, dokter, prosedur, atau informasi lain yang terdapat di aplikasi seluler. Ketergantungan pada informasi yang disediakan oleh Sehati, anggota tim Sehati, atau orang lain yang muncul di aplikasi seluler atas nama Sehati adalah semata-mata resiko Anda sendiri.</p>
    <p>Aplikasi seluler ini ditujukan untuk mengkomunikasikan informasi saja. Aplikasi seluler ini tidak dimaksudkan untuk menggantikan nasihat medis individual dari seorang profesional medis yang terlatih. Pengguna disarankan untuk berkonsultasi dengan profesional kesehatan yang berkompeten mengenai masalah medis sebelum mengambil tindakan berdasarkan informasi yang didapat dalam aplikasi seluler ini.</p>
    <h3>Aplikasi seluler ini dioperasikan oleh PT Zetta Sehati Nusantara ("Kami")</h3>
    <p>Materi-materi yang terkandung di dalam aplikasi seluler kami disediakan hanya untuk tujuan informasi umum dan bukan merupakan nasihat hukum atau nasehat profesional lainnya dan tidak untuk diandalkan untuk nasihat hukum maupun profesional.</p>
    <p>Kami tidak menerima kewajiban apapun atas kehilangan yang mungkin timbul dari tindakan Anda mengakses atau bergantung pada informasi yang terdapat pada aplikasi seluler ini dan sepanjang diperbolehkan oleh hukum yang berlaku di Republik Indonesia, kami tidak bertanggungjawab sehubungan dengan kehilangan atau kerusakan yang secara langsung maupun tidak langsung timbul akibat penggunaan aplikasi seluler ini.</p>
    <h3>Mengakses aplikasi seluler kami</h3>
    <p>Kami memiliki hak untuk menarik atau mengubah layanan yang kami sediakan di aplikasi seluler kami tanpa pemberitahuan. Kami tidak bertanggungjawab apabila karena sebab apapun juga aplikasi seluler kami tidak dapat diakses pada waktu kapan pun atau pada periode kapan pun.</p>
    <p>Kami dapat, atas dasar kebijakan kami sendiri, menghapus materi yang Anda serahkan apabila kami pandang perlu, termasuk namun tidak terbatas pada komentar-komentar dan tampilan-tampilan.</p>
    <h3>Hak kekayaan intelektual</h3>
    <p>Kami adalah pemilik atau pihak yang memiliki izin atas segala hak kekayaan intelektual di dalam aplikasi seluler kami. Seluruh materi tersebut dilindungi oleh hukum-hukum mengenai hak cipta dan perjanjian-perjanjian internasional yang ada di berbagai belahan dunia. Seluruh hak tersebut dilindungi.</p>
    <p>Anda dapat mencetak satu salinan, dan Anda dapat mengunduh ekstrak dari halaman-halaman yang ada di aplikasi seluler kami untuk referensi pribadi Anda dan Anda dapat menarik perhatian orang lain kepada materi yang ditampilkan di aplikasi seluler kami.</p>
    <p>Anda tidak diperbolehkan untuk dengan cara apapun juga memodifikasi kertas atau menyalin secara digital materi-materi yang Anda cetak atau unduh, dan Anda tidak diperbolehkan untuk menggunakan seluruh atau bagian ilustrasi, fotografi, video atau audio, atau grafik manapun secara terpisah dari teks yang menyertainya.</p>
    <p>Status kami (dan para kontributor yang tertera didalamnya) sebagai pencipta materi dalam aplikasi seluler kami harus selalu diakui.</p>
    <p>Anda tidak diperbolehkan untuk menggunakan bagian mana pun dari materi-materi yang ada di aplikasi seluler kami untuk tujuan komersial tanpa mendapatkan izin untuk melakukan hal tersebut dari kami atau pemberi lisensi kami.</p>
    <h3>Aplikasi seluler kami diperbaharui secara rutin</h3>
    <p>Kami bertujuan untuk memperbaharui aplikasi seluler kami secara rutin, dan dapat mengubah isinya setiap saat. Apabila kebutuhan tersebut muncul, kami dapat menghentikan sementara akses kepada aplikasi seluler kami, atau mehentikannya selamanya.</p>
    <h3>Kewajiban kami</h3>
    <p>Sepanjang dipersyaratkan oleh hukum yang berlaku, kami tidak membatasi dalam segala cara kewajiban kami yang tidak dapat dikesampingkan atau dibatasi berdasarkan hukum yang berlaku.</p>
    <p>Dengan tunduk kepada hukum yang berlaku, dalam kondisi apapun kami, Grup Perusahaan Kalbe, lisensor atau lisensee kami, tidak bertanggungjawab terhadap Anda atau orang lain atau entitas lain atas segala tindakan yang dapat dihukum atau kerusakan lainnya termasuk secara langsung maupun tidak langsung kehilangan pendapatan, cedera pribadi (termasuk kematian) dan kerusakan dan kerugian barang atau milik Anda, yang mungkin timbul sebagai akibat dari (a) penggunaan, atau ketidakmampuan untuk menggunakan, aplikasi seluler ini atau materi manapun yang ada di aplikasi seluler ini, (b) segala tindakan dari setiap pengguna aplikasi seluler. Kami tidak bertanggungjawab bahkan apabila kami atau perwakilan resmi kami telah diberitahukan mengenai kemungkinan kerugian tersebut. Hal ini termasuk namun tidak terbatas pada kerugian atau cedera yang diakibatkan oleh kesalahan, kelalaian, interupsi, cacat, kegagalan dalam melaksanakan, tertundanya operasi atau komponen berbahaya lainnya.</p>
    <p>Kami tidak memiliki tanggungjawab atau kewajiban sehubungan dengan materi yang terkandung di dalam materi yang diberikan oleh pengguna aplikasi seluler kami (Materi Pengguna).</p>
    <p>Bagaimanapun juga total kewajiban kami terhadap Anda untuk kerugian, kehilangan, dan hal-hal lain yang merupakan akibat dari tindakan-tindakan apapun juga tidak akan melebihi jumlah biaya yang Anda keluarkan, jika ada, untuk mengakses aplikasi seluler ini.</p>
    <h3>Informasi mengenai Anda dan kunjungan Anda ke aplikasi seluler kami</h3>
    <p>Kami mengelola informasi mengenai Anda sebagaimana diatur dalam kebijakan privasi kami. Dengan menggunakan aplikasi seluler kami, Anda mengizinkan pengelolaan tersebut dan Anda menjamin bahwa seluruh data yang Anda berikan adalah akurat.</p>
    <h3>Hak dan kewajiban Anda</h3>
    <p>Apabila aplikasi seluelr kami mengizinkan Anda untuk mengirimkan atau memberikan materi apapun juga, Anda tidak diperbolehkan untuk memberikan materi yang:</p>
    <ul>
        <li>Melanggar ketentuan hukum</li>
        <li>Mengandung pornografi</li>
        <li>Mengandung isu sensitif (politik, etnis, agama, ras, antar-golongan)</li>
        <li>Melanggar hak orang lain</li>
        <li>Mendiskreditkan produk atau merek kami</li>
        <li>Mengandung iklan, kesempatan investasi atau komunikasi komersial lainnya yang tidak kami minta</li>
    </ul>
    <h3>Kesepakatan untuk terikat pada ketentuan penggunaan ini</h3>
    <p>Penggunaan Anda terhadap aplikasi seluler dan salah satu dari produk-produk kami, kompetisi, undian berhadiah, jasa-jasa, data, software, aplikasi-aplikasi, widget-widget dan perangkat-perangkat yang disediakan untuk Anda, atau dari, atau melalui aplikasi seluler kami (secara bersama-sama disebut sebagai “Layanan”) tunduk terhadap perjanjian hukum antara Anda dan kami. Selain daripada Ketentuan Penggunaan ini, perjanjian hukum juga terdiri dari (i) Kebijakan Privasi. Dalam hal terjadi konflik akibat perbedaan antara Ketentuan Penggunaan dan Kebijakan Privasi, Ketentuan Penggunaan yang akan berlaku.</p>
    <h3>Materi dari pengguna</h3>
    <p>Bagian tertentu dari aplikasi seluler kami dapat mengajak Anda atau memungkinkan Anda mem-posting, mengunggah, embed (menautkan), menampilkan atau dengan cara lain mengkomunikasikan teks, pesan, foto, video, rekaman suara, musik (termasuk lirik), grafik, gambar, saran, ide (termasuk ide produk dan iklan), nama Anda dan/atau orang lain, kemiripannya, suara, nama-pengguna, pertunjukan dan informasi lain, materi-materi atau materi yang dimiliki atau diciptakan oleh Anda (secara bersama-sama disebut sebagai “Materi Pengguna”).</p>
    <p>Anda menjamin dan menyatakan bahwa Anda telah memiliki (dan akan terus-menerus selama Anda menggunakan aplikasi seluler ini) seluruh hak, izin, dan persetujuan yang dibutuhkan untuk memungkinkan kami, Grup Perusahaan Kalbe dan/atau penyedia materi untuk menggunakan Materi Pengguna Anda untuk tujuan yang mungkin ada saat ini atau dimasa yang akan datang bagi aplikasi seluler kami dan Ketentuan Penggunaan ini.</p>
    <p>Lebih lanjut Anda menjamin dan menyatakan bahwa Anda memiliki izin, dan segala dokumentasi yang diperlukan dari setiap individu yang terkandung dalam Materi Pengguna Anda untuk menggunakan namanya atau kemiripannya dengan cara sebagaimana diatur dalam aplikasi seluler ini dan produk-produk kami, layanan-layanan kami atau materi lain yang ada di aplikasi seluler kami.</p>
    <p>Sehubungan dengan Materi Pengguna, Anda setuju bahwa Anda memahami dan sepakat bahwa Anda secara mutlak bertanggungjawab atas Materi Pengguna Anda dan konsekuensi yang timbul dari publikasi atau posting Materi Pengguna tersebut.</p>
    <p>Anda mengakui dan menyetujui bahwa informasi, materi-materi dan opini-opini yang dikemukakan atau termasuk dalam Materi pengguna manapun di dalam aplikasi seluler kami bukanlah dari kami atau afiliasi kami atau perusahaan terkait kami atau penyedia muatan kami; dan kami tidak memiliki kewajiban dan tanggungjawab apapun sehubungan dengan seluruh Materi Pengguna yang ada dalam aplikasi seluler kami. Anda sepakat untuk melepaskan, dan dengan ini melepaskan, seluruh hak secara hukum atau hak wajar lainnya atau upaya lainnya yang mungkin Anda lakukan atau miliki terhadap kami sehubungan dengan Ketentuan Penggunaan.</p>
    <p>Dengan mengunggah Materi Pengguna Anda memahami bahwa Materi Pengguna dapat tersedia bagi khalayak umum dan Anda sepakat untuk tidak akan mengajukan tuntutan di bagian dunia manapun juga untuk klaim terhadap pelanggaran privasi, atau pelanggaran atas hak Anda berdasarkan Hukum Indonesia yang muncul dari penggunaan kami terhadap Materi Pengguna Anda sebagaimana diatur oleh Ketentuan Penggunaan ini.</p>
    <p>Anda mengakui dan memahami bahwa kami menganggap Materi Pengguna sebagai hal yang bukan rahasia dan tidak menjamin kerahasiaan apapun sehubungan dengan Materi Pengguna.</p>
    <h3>Kepemilikan materi pengguna</h3>
    <p>Dengan memberikan atau mengirimkan Materi Pengguna kepada kami melalui aplikasi seluler ini, Anda sepakat bahwa Materi Pengguna Anda akan menjadi dan tetap menjadi milik eksklusif kami, termasuk setiap hak-hak yang mungkin ada di masa depan sehubungan dengan Materi Pengguna Anda, bahkan apabila Ketentuan Pengguna ini nantinya dimodifikasi atau dihentikan.</p>
    <p>Ini berarti Anda menyangkal/melepaskan setiap hak milik dan/atau hak kekayaan intelektual yang terkandung di dalam Materi Pengguna tersebut, dan Anda mengakui hak tidak terbatas kami untuk menggunakannya (atau materi-materi atau ide-ide yang serupa dengannya) di media manapun juga, sekarang atau di masa mendatang, tanpa pemberitahuan, kompensasi atau kewajiban lain kepada Anda atau orang lain. Ini juga berarti kami tidak memiliki kewajiban apapun untuk menjaga kerahasiaan Materi Pengguna Anda.</p>
    <p>Anda melepaskan segala hak-hak moral yang mungkin Anda miliki berdasarkan peraturan yang berlaku sekarang atau di masa mendatang di bagian dunia manapun sehubungan dengan Materi Pengguna Anda.</p>
    <h3>Tautan dari situs kami</h3>
    <p>Apabila aplikasi seluler kami mengandung tautan ke situs dan sumber lain yang disediakan oleh pihak lain, tautan-tautan tersebut disediakan hanya untuk informasi kepada Anda. Kami tidak memiliki kendali terhadap isi situs-situs tersbut, dan tidak memiliki kewajiban terhadap mereka atau terhadap kerugian atau kehilangan apapun yang mungkin muncul sehubungan dengan penggunaan Anda atas situs-situs tersebut.</p>
    <h3>Yurisdiksi dan hukum yang berlaku</h3>
    <p>Ketentuan Penggunaan dan/atau penggunaan Anda atas aplikasi seluler kami ini dan setiap perselisihan atau klaim yang muncul sebagai akibat dari atau sehubungan dengannya diatur dan tunduk kepada hukum yang berlaku di Republik Indonesia.</p>
    <p>Pengadilan Negeri Jakarta Timur memiliki yurisdiksi terhadap setiap klaim, perselisihan yang timbul dari atau sehubungan dengan kunjungan ke aplikasi seluler kami dan/atau Ketentuan Penggunaan ini.</p>
    <h3>Variasi</h3>
    <p>Kami dapat memperbaharui Ketentuan Penggunaan ini setiap saat dengan mengubah halaman ini. Anda diharapkan untuk mengunjungi halaman ini dari waktu ke waktu untuk memperhatikan perubahan-perubahan yang kami lakukan, mengingat hal tersebut berlaku mengikat terhadap Anda. Beberapa ketentuan yang terkandung di dalam Ketentuan Penggunaan ini dapat juga dikesampingkan oleh ketentuan kami yang mungkin kami publikasikan di bagian lain dari aplikasi seluler kami.</p>
    <h3>Indemnifikasi</h3>
    <p>Anda dengan ini sepakat untuk membela, menjamin dan melepaskan kami, Grup Perusahaan Kalbe dan setiap agen, penerima-hak dari kami, penerus kami, dari dan terhadap klaim, aksi, tuntutan apapun dan dari setiap kerugian, tanggungjawab, biaya dan pengeluaran, sebagai akibat dari penggunaan aplikasi seluler kami oleh Anda, penggunaan Materi Pengguna sebagaimana diatur dalam Ketentuan Penggunaan ini, dan/atau pelanggaran atau usaha pelanggaran terhadap jaminan, pernyataan dan kesepakatan Anda dalam Ketentuan Penggunaan ini.</p>
    <h3>Keterpisahan</h3>
    <p>Apabila ada ketentuan dalam Ketentuan Pengguna ini yang berdasarkan hukum yang berlaku dianggap melanggar hukum, batal demi hukum, atau karena alasan lain tidak dapat diterapkan, maka ketentuan tersebut harus diperlakukan sebagai terpisah dari Ketentuan Pengguna ini dan tidak mempengaruhi keberlakuan dan penerapan kebijakan-kebijakan lainnya dalam Ketentuan Pengguna ini.</p>
    <h3>Tidak ada efek hukum</h3>
    <p>Judul-judul dari paragraf yang ada dalam Ketentuan Pengguna dibuat hanya untuk memudahkan dalam membaca dan tidak memiliki akibat hukum.</p>
    <h3>Korespondensi</h3>
    <p>Apabila Anda memiliki hal-hal yang ingin Anda sampaikan mengenai materi yang muncul di aplikasi seluler kami, mohon hubungi admin@sehat-i.com</p>
    <p>Terima kasih telah menggunakan aplikasi seluler kami.</p>
 </body>
</html>
`

export default class Syarat extends Component {

    static navigationOptions = {
        title: 'Syarat & Ketentuan '
    }

    render() {
        return (
                <AutoHeightWebView
                    source={{ html: content }}
                    style={{ flex: 1 }}
                />
        )
    }

}
