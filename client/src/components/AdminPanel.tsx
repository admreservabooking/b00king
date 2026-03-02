import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus, Upload, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface HotelPhoto {
  id: string;
  url: string;
  title: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  photos: HotelPhoto[];
  onPhotosChange: (photos: HotelPhoto[]) => void;
  updateHotelDataMutation?: any;
  hotelInfo: {
    propertyName: string;
    clientName: string;
    address: string;
    rating: number;
    reviewCount: number;
    checkInDate: string;
    checkOutDate: string;
    hospedageValue: number;
    paymentLink30: string;
    clientEmail: string;
    clientPhone: string;
    guestCount: number;
    detail1: string;
    detail2: string;
    detail3: string;
    roomType: string;
    breakfastIncluded: boolean;
    freeCancellationDate: string;
    mainGuestName: string;
  };
  onHotelInfoChange: (info: any) => void;
}

const ADMIN_PASSWORD = '12345678';

export default function AdminPanel({
  isOpen,
  onClose,
  photos,
  onPhotosChange,
  updateHotelDataMutation,
  hotelInfo,
  onHotelInfoChange,
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      toast.success('Autenticado com sucesso!');
    } else {
      toast.error('Senha incorreta');
      setPassword('');
    }
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          const newPhoto: HotelPhoto = {
            id: Date.now().toString(),
            url: dataUrl,
            title: file.name.split('.')[0],
          };
          onPhotosChange([...photos, newPhoto]);
          toast.success('Foto adicionada com sucesso!');
        };
        reader.readAsDataURL(file);
      });
    }
    setFileInputKey(prev => prev + 1);
  };

  const handleRemovePhoto = (id: string) => {
    onPhotosChange(photos.filter((photo) => photo.id !== id));
    toast.success('Foto removida');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-white p-6 flex items-center justify-between border-b">
          <h2 className="text-2xl font-bold">Painel de Administração</h2>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              onClose();
            }}
            className="p-1 hover:bg-primary/80 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          <div className="p-6 flex items-center justify-center min-h-96">
            <form onSubmit={handlePasswordSubmit} className="w-full max-w-sm space-y-4">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-bold text-foreground">Acesso Restrito</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Digite a senha para acessar o painel
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Entrar
              </Button>
            </form>
          </div>
        ) : (
          <div className="p-6 space-y-8">
            {/* Informações do Hóspede */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Informações da Reserva</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="propertyName" className="text-sm font-medium">
                    Nome do Imóvel
                  </Label>
                  <Input
                    id="propertyName"
                    value={hotelInfo.propertyName}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, propertyName: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Ex: Luxury Beachfront Resort"
                  />
                </div>

                <div>
                  <Label htmlFor="clientName" className="text-sm font-medium">
                    Nome do Cliente
                  </Label>
                  <Input
                    id="clientName"
                    value={hotelInfo.clientName}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, clientName: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Ex: João Silva"
                  />
                </div>

                <div>
                  <Label htmlFor="clientEmail" className="text-sm font-medium">
                    Email do Cliente
                  </Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={hotelInfo.clientEmail || ''}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, clientEmail: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Ex: cliente@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="checkInDate" className="text-sm font-medium">
                    Data de Check-in
                  </Label>
                  <Input
                    id="checkInDate"
                    type="date"
                    value={hotelInfo.checkInDate}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, checkInDate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="checkOutDate" className="text-sm font-medium">
                    Data de Check-out
                  </Label>
                  <Input
                    id="checkOutDate"
                    type="date"
                    value={hotelInfo.checkOutDate}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, checkOutDate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="hospedageValue" className="text-sm font-medium">
                    Valor da Hospedagem (R$)
                  </Label>
                  <Input
                    id="hospedageValue"
                    type="number"
                    step="0.01"
                    value={hotelInfo.hospedageValue}
                    onChange={(e) =>
                      onHotelInfoChange({
                        ...hotelInfo,
                        hospedageValue: parseFloat(e.target.value),
                      })
                    }
                    className="mt-1"
                    placeholder="Ex: 2198.00"
                  />
                </div>

                <div>
                  <Label htmlFor="hotelAddress" className="text-sm font-medium">
                    Endereço do Hotel
                  </Label>
                  <Input
                    id="hotelAddress"
                    value={hotelInfo.address}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, address: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Ex: Rua do Telegráfo, 2779, Porto Seguro"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paymentLink30" className="text-sm font-medium">
                    Link de Pagamento 30%
                  </Label>
                  <Input
                    id="paymentLink30"
                    value={hotelInfo.paymentLink30}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, paymentLink30: e.target.value })
                    }
                    className="mt-1"
                    placeholder="https://seu-link-de-pagamento.com"
                  />
                </div>

                <div>
                  <Label htmlFor="clientPhone" className="text-sm font-medium">
                    Telefone do Cliente
                  </Label>
                  <Input
                    id="clientPhone"
                    value={hotelInfo.clientPhone}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, clientPhone: e.target.value })
                    }
                    className="mt-1"
                    placeholder="+55 (11) 99999-9999"
                  />
                </div>

                <div>
                  <Label htmlFor="guestCount" className="text-sm font-medium">
                    Quantidade de Hóspedes
                  </Label>
                  <Input
                    id="guestCount"
                    type="number"
                    min="1"
                    max="10"
                    value={hotelInfo.guestCount}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, guestCount: parseInt(e.target.value) })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="detail1" className="text-sm font-medium">
                    Detalhe 1 da Reserva
                  </Label>
                  <Input
                    id="detail1"
                    value={hotelInfo.detail1}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, detail1: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Ex: Não reembolsvel"
                  />
                </div>

                <div>
                  <Label htmlFor="detail2" className="text-sm font-medium">
                    Detalhe 2 da Reserva
                  </Label>
                  <Input
                    id="detail2"
                    value={hotelInfo.detail2}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, detail2: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Ex: WiFi disponível"
                  />
                </div>

                <div>
                  <Label htmlFor="detail3" className="text-sm font-medium">
                    Detalhe 3 da Reserva
                  </Label>
                  <Input
                    id="detail3"
                    value={hotelInfo.detail3}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, detail3: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Ex: Café da manhã incluido"
                  />
                </div>

                <div>
                  <Label htmlFor="roomType" className="text-sm font-medium">
                    Tipo de Quarto
                  </Label>
                  <Input
                    id="roomType"
                    value={hotelInfo.roomType}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, roomType: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Ex: Quarto Duplo"
                  />
                </div>

                <div>
                  <Label htmlFor="mainGuestName" className="text-sm font-medium">
                    Hóspede Principal
                  </Label>
                  <Input
                    id="mainGuestName"
                    value={hotelInfo.mainGuestName}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, mainGuestName: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Ex: Wallas Pereira"
                  />
                </div>

                <div>
                  <Label htmlFor="freeCancellationDate" className="text-sm font-medium">
                    Data de Cancelamento Gratuito
                  </Label>
                  <Input
                    id="freeCancellationDate"
                    type="date"
                    value={hotelInfo.freeCancellationDate}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, freeCancellationDate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="breakfastIncluded"
                    type="checkbox"
                    checked={hotelInfo.breakfastIncluded}
                    onChange={(e) =>
                      onHotelInfoChange({ ...hotelInfo, breakfastIncluded: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <Label htmlFor="breakfastIncluded" className="text-sm font-medium cursor-pointer">
                    Pequeno-almoço Incluido
                  </Label>
                </div>

                <div>
                  <Label htmlFor="rating" className="text-sm font-medium">
                    Avaliação
                  </Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={hotelInfo.rating}
                      onChange={(e) =>
                        onHotelInfoChange({
                          ...hotelInfo,
                          rating: parseFloat(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reviewCount" className="text-sm font-medium">
                      Quantidade de Avaliações
                    </Label>
                    <Input
                      id="reviewCount"
                      type="number"
                      value={hotelInfo.reviewCount}
                      onChange={(e) =>
                        onHotelInfoChange({
                          ...hotelInfo,
                          reviewCount: parseInt(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Gerenciamento de Fotos */}
            <section className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground">Fotos do Hotel</h3>

              {/* Upload de Fotos */}
              <div className="bg-secondary p-4 rounded-lg space-y-3">
                <label className="block">
                  <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <Upload className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Clique para selecionar fotos
                    </span>
                  </div>
                  <input
                    key={fileInputKey}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleAddPhoto}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Fotos Atuais */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {photos.length} foto(s) adicionada(s)
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative group border border-border rounded-lg overflow-hidden"
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs p-2 bg-secondary text-foreground truncate">
                        {photo.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Copy Link Section */}
            <section className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground">Compartilhar Reserva</h3>
              <p className="text-xs text-muted-foreground">
                Copie o link abaixo para compartilhar com o hóspede. Os dados que você configurou virão pré-preenchidos.
              </p>
              <Button
                onClick={() => {
                  const baseUrl = window.location.origin + window.location.pathname;
                  const params = new URLSearchParams({
                    clientName: hotelInfo.clientName,
                    clientEmail: hotelInfo.clientEmail,
                    clientPhone: hotelInfo.clientPhone,
                    propertyName: hotelInfo.propertyName,
                    roomType: hotelInfo.roomType,
                    mainGuestName: hotelInfo.mainGuestName,
                    guestCount: String(hotelInfo.guestCount),
                    hospedageValue: String(hotelInfo.hospedageValue),
                    paymentLink30: hotelInfo.paymentLink30,
                    address: hotelInfo.address,
                    rating: String(hotelInfo.rating),
                    reviewCount: String(hotelInfo.reviewCount),
                    detail1: hotelInfo.detail1,
                    detail2: hotelInfo.detail2,
                    detail3: hotelInfo.detail3,
                    breakfastIncluded: String(hotelInfo.breakfastIncluded),
                    freeCancellationDate: hotelInfo.freeCancellationDate,
                  });
                  const fullUrl = `${baseUrl}?${params.toString()}`;
                  navigator.clipboard.writeText(fullUrl);
                  toast.success('Link copiado para a área de transferência!');
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Copiar Link com Dados
              </Button>
            </section>

            {/* Footer */}
            <div className="border-t pt-6 flex gap-3">
              <Button
                onClick={async () => {
                  try {
                    const photosJson = JSON.stringify(photos);
                    await updateHotelDataMutation.mutateAsync({
                      ...hotelInfo,
                      photos: photosJson
                    });
                    toast.success('Alterações salvas no servidor!');
                    handleLogout();
                  } catch (error) {
                    toast.error('Erro ao salvar alterações');
                  }
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Salvar e Fechar
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-border hover:bg-secondary"
              >
                Sair
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
