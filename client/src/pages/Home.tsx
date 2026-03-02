import { useState } from 'react';
import HotelCard from '@/components/HotelCard';
import BookingForm from '@/components/BookingForm';
import AdminPanel from '@/components/AdminPanel';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface HotelPhoto {
  id: string;
  url: string;
  title: string;
}

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // 🔹 FUNÇÃO DE PAGAMENTO (INFINITEPAY DIRETO)
  const pagar = () => {
    window.location.href =
      'https://checkout.infinitepay.io/SEU_LINK_DE_PAGAMENTO_AQUI';
  };

  const hotelData = {
    propertyName: 'Luxury Beachfront Resort',
    clientName: 'João Silva',
    address: 'Praia de Taperapuan, Porto Seguro, Brazil',
    rating: 8.9,
    reviewCount: 1245,
    hospedageValue: 2198,
    clientEmail: 'hospede@email.com',
    clientPhone: '+55 11 99999-9999',
    guestCount: 2,
    detail1: 'Não reembolsável',
    detail2: 'Wi-Fi gratuito',
    detail3: 'Café da manhã incluso',
    roomType: 'Quarto Duplo',
    breakfastIncluded: true,
    freeCancellationDate: '2026-01-29',
    mainGuestName: 'Hóspede Principal',
  };

  const photos: HotelPhoto[] = [
    { id: '1', url: '/images/hotel-hero.jpg', title: 'Hotel' },
    { id: '2', url: '/images/hotel-room.jpg', title: 'Quarto' },
    { id: '3', url: '/images/hotel-pool.jpg', title: 'Piscina' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div className="font-bold text-lg text-primary">Booking</div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdminOpen(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Admin
          </Button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <HotelCard
            hotelName={hotelData.propertyName}
            address={hotelData.address}
            rating={hotelData.rating}
            reviewCount={hotelData.reviewCount}
            photos={photos}
            amenities={['Wi-Fi']}
            checkIn="13 Fev 2026"
            checkOut="17 Fev 2026"
            totalPrice={hotelData.hospedageValue}
            nights={4}
            guestCount={hotelData.guestCount}
            details={[
              hotelData.detail1,
              hotelData.detail2,
              hotelData.detail3,
            ]}
          />
        </div>

        <div className="lg:col-span-3 border p-6 rounded">
          <BookingForm
            onSubmit={() => {}}
            totalPrice={hotelData.hospedageValue}
            clientName={hotelData.clientName}
            clientEmail={hotelData.clientEmail}
            clientPhone={hotelData.clientPhone}
            details={[
              hotelData.detail1,
              hotelData.detail2,
              hotelData.detail3,
            ]}
            propertyName={hotelData.propertyName}
            roomType={hotelData.roomType}
            breakfastIncluded={hotelData.breakfastIncluded}
            freeCancellationDate={hotelData.freeCancellationDate}
            mainGuestName={hotelData.mainGuestName}
            guestCount={hotelData.guestCount}
          />
        </div>
      </main>

      {/* BOTÃO DE PAGAMENTO */}
      <div className="flex justify-center my-10">
        <Button size="lg" onClick={pagar}>
          Pagar reserva 💳
        </Button>
      </div>

      {/* Admin */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        photos={photos}
        onPhotosChange={() => {}}
        updateHotelDataMutation={null as any}
        hotelInfo={hotelData}
        onHotelInfoChange={() => {}}
      />

      {/* Footer */}
      <footer className="border-t p-6 text-center text-xs text-gray-500">
        © 2026 Booking.com. All rights reserved.
      </footer>
    </div>
  );
}
