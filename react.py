import requests
import sys

MY_API_KEY = "0e672de84222f05f908830b5c34e3a4d4ec65ba5fc4c7e9ebf212173090fc37c"

# URL Utama (Base URL)
# Catatan: Bagian '/endpoint' di akhir URL mungkin perlu diganti 
# jika script tidak jalan (misal jadi '/react' atau '/wa/react'). 
BASE_URL = "https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api/endpoint"

def kirim_react(emoji_input, link_input):
    try:
        # Parameter yang dikirim ke server
        params = {
            'apiKey': MY_API_KEY,
            'url': link_input,
            'emoji': emoji_input
        }
        
        # Kirim request GET (sesuai format URL yang ada '?apiKey=')
        # Kita pakai GET karena key ada di URL. Jika gagal, nanti ubah ke POST.
        response = requests.get(BASE_URL, params=params)
        
        # Cek status
        if response.status_code == 200:
            # Mengambil respon JSON jika ada
            try:
                hasil = response.json()
                print(f"\n✅ Sukses: {hasil}")
            except:
                print(f"\n✅ Terkirim! (Respon: {response.text})")
        else:
            print(f"\n❌ Gagal! Status Code: {response.status_code}")
            print(f"Pesan Error: {response.text}")

    except Exception as e:
        print(f"\n❌ Error Koneksi: {e}")

def main():
    # Tampilan Header
    print("🔥 risshyt.react🔥")
    
    try:
        # Input User
        emoji_in = input("emoji : ")
        link_in = input("link : ")
        
        # Eksekusi
        if emoji_in and link_in:
            print("\nSedang mengirim...")
            kirim_react(emoji_in, link_in)
        else:
            print("❌ Data tidak boleh kosong.")
            
    except KeyboardInterrupt:
        print("\nExit.")
        sys.exit()

if __name__ == "__main__":
    main()
  
