import React, { Component } from 'react'
import { WebView, StyleSheet, View, ScrollView } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview';

const content = `<html>
<body>
    <h3>PT Zetta Sehati Nusantara ("Kami") berkomitmen untuk melindungi dan menghormati privasi Anda.</h3>
    <p>Kebijakan ini (bersama dengan Ketentuan Penggunaan dan dokumen-dokumen lain yang terkait dengannya) menjadi dasar yang mengatur bagaimana kami mengelola data yang kami dapatkan dari Anda, dan/atau yang Anda sediakan bagi kami. Anda dipersilakan untuk membaca ketentuan ini dengan seksama untuk memahami pandangan dan prilaku kami terkait dengan data Anda dan bagaimana kami akan memperlakukannya.</p>
    <p>Kebijakan ini hanya berlaku bagi aplikasi seluler kami. Jika Anda meninggalkan aplikasi seluler kami dengan mengklik suatu tautan/link atau dengan cara lainnya, Anda akan menjadi subjek atau tunduk kepada kebijakan dari penyelenggara situs lain tersebut. Kami tidak memiliki kontrol dan tidak bertanggungjawab terhadap kebijakan tersebut atau ketentuan-ketentuan yang berlaku terhadap situs tersebut.</p>
    <h3>Informasi Anda Yang Dapat Kami Himpun</h3>
    <p>Kami dapat menghimpun dan mengelola data berikut ini mengenai Anda:</p>
    <ul>
        <li>Informasi yang Anda sediakan dengan cara mengisi formulir di aplikasi seluler kami ("aplikasi seluler kami"). Termasuk di dalamnya informasi yang disediakan kepada kami pada saat mendaftarkan diri untuk menggunakan aplikasi seluler kami, berlangganan jasa kami atau meminta layanan jasa lanjutan. Kami juga dapat meminta informasi dari Anda ketika Anda melaporkan kesulitan sehubungan dengan aplikasi seluler kami.</li>
        <li>Jika Anda menghubungi kami, kami dapat menyimpan salinan dari korespondensi tersebut.</li>
        <li>Kami juga dapat meminta Anda untuk melengkapi survei yang kami gunakan untuk keperluan riset, meskipun demikian Anda tidak harus menanggapinya.</li>
        <li>Detail dari kunjungan-kunjungan Anda ke aplikasi seluler kami termasuk, namun tidak terbatas, lalu-lintas data, lokasi data, weblogs, sistem operasi, penggunaan internet Anda dan data komunikasi lainnya, dan sumber-sumber yang Anda akses.</li>
    </ul>
    <h3>Alamat IP dan Cookies</h3>
    <p>Kami dapat menghimpun informasi mengenai dawai Anda, termasuk apabila memungkinkan alamat IP Anda, sistem operasi dan tipe alat pencari Anda, untuk keperluan sistem administrasi dan untuk keperluan kami lainnya.</p>
    <p>Kami dapat memperoleh informasi mengenai penggunaan internet Anda secara umum dengan menggunakan cookie yang disimpan di hard-drive dawai Anda. Cookies membantu kami untuk meningkatkan layanan aplikasi seluler kami dan menyediakan jasa layanan yang lebih baik dan lebih terfokus bagi Anda.
    Anda dapat menolak cookies dengan mengaktivasikan pengaturan di mesin pencari Anda yang memungkinkan Anda untuk menolak cookies. Namun, jika Anda memilih pengaturan tersebut Anda mungkin menjadi tidak dapat mengakses beberapa bagian dari aplikasi seluler kami.</p>
    <h3>Tempat Kami Menyimpan Data Pribadi Anda</h3>
    <p>Data yang kami kumpulkan dari Anda dapat kami transfer ke, dan simpan di, lokasi didalam maupun diluar Republik Indonesia. Dengan memberikan data Anda, Anda sepakat terhadap transfer, penyimpanan atau pengelolaan ini. Kami akan menggunakan usaha terbaik kami sewajarnya untuk memastikan data Anda diperlakukan aman dan sesuai dengan kebijakan privasi ini.</p>
    <p>Apabila kami memberikan Anda (atau apabila Anda memilih untuk memiliki) kata kunci atau password yang memungkinkan Anda untuk mengakses bagian-bagian tertentu dari aplikasi seluler kami, Anda bertanggungjawab untuk menjaga kerahasiaan password tersebut. Kami meminta Anda untuk tidak memberitahukan password tersebut kepada orang lain.</p>
    <h3>Penggunaan Terhadap Informasi</h3>
    <p>Kami menggunakan informasi yang kami miliki tentang Anda dengan cara sebagai berikut:</p>
    <ul>
        <li>Untuk memastikan materi dalam situs kami disajikan dengan cara yang paling tepat bagi Anda dan dawai Anda</li>
        <li>Untuk memberikan Anda informasi, promosi, jasa-jasa yang mungkin Anda minta dari kami atau yang menurut kami mungkin menarik bagi Anda</li>
        <li>Untuk memungkinkan Anda untuk berpartisipasi di layanan-layanan kami.</li>
    </ul>
    <p>Kami juga dapat menggunakan data Anda, atau mengizinkan pihak ketiga untuk menggunakan data Anda, untuk memberikan kepada Anda informasi mengenai barang-barang dan jasa-jasa yang mungkin menarik bagi Anda dan kami atau mereka dapat menghubungin Anda mengenai hal tersebut.</p>
    <h3>Keterbukaan Informasi Anda</h3>
    <p>Kami dapat memberikan informasi mengenai Anda kepada pihak ketiga:</p>
    <ul>
        <li>Dalam hal kami menjual atau membeli bisnis-bisnis atau aset-aset, yang dalam hal tersebut kami dapat memberikan data Anda kepada calon penjual atau pembeli dari bisnis-bisnis atau aset-aset tersebut</li>
        <li>Jika kami berada dibawah kewajiban untuk membuka atau memberikan data Anda dalam rangka pemenuhan terhadap kewajiban hukum, pelanggan kami, atau lainnya. Hal ini termasuk bertukar informasi dengan perusahaan dan organisasi lain untuk tujuan perlindungan terhadap penipuan dan/atau perlindungan terhadap tindak kejahatan.</li>
    </ul>
    <h3>Hak Anda</h3>
    <p>Aplikasi seluler kami dapat, dari waktu ke waktu, mengandung tautan ke dan dari situs dari jaringan partner kami, pengiklan dan afiliasi kami. Jika Anda membuka tautan tersebut, Anda menyadari bahwa situs-situs tersebut memiliki kebijakan privasinya sendiri dan kami tidak bertanggungjawab atau memiliki kewajiban terhadap kebijakan-kebijakan mereka.</p>
    <h3>Perubahan Terhadap Kebijakan Privasi Kami</h3>
    <p>Setiap perubahan yang mungkin kami buat terhadap kebijakan privasi kami di masa mendatang akan kami tampilkan di halaman ini. Kami menyarankan Anda untuk secara reguler mengunjungi halaman ini untuk terus-menerus mengetahui perubahan yang ada.</p>
    <h3>Kontak</h3>
    <p>Anda dapat mengirimkan pertanyaan-pertanyaan, komentar-komentar dan permintaan-permintaan mengenai kebijakan privasi ini kepada admin@sehat-i.com</p>
    <h3>Hukum dan Wilayah Hukum</h3>
    <p>Kebijakan privasi ini diatur dan tunduk kepada Hukum yang berlaku di Indonesia dan setiap perselisihan yang timbul sehubungan dengan syarat dan ketentuan didalamnya akan diselesaikan di Pengadilan Negeri Jakarta Selatan.</p>
</body>
</html>
`

export default class Kebijakan extends Component {

    static navigationOptions = {
        title: 'Kebijakan dan Privasi '
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
