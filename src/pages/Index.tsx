import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const services = [
  { id: 1, name: 'Стрижка женская', price: '2 500 ₽', icon: 'Scissors' },
  { id: 2, name: 'Окрашивание', price: 'от 5 000 ₽', icon: 'Droplet' },
  { id: 3, name: 'Укладка', price: '1 800 ₽', icon: 'Wind' },
  { id: 4, name: 'Уход за волосами', price: 'от 3 000 ₽', icon: 'Sparkles' },
  { id: 5, name: 'Стрижка мужская', price: '1 500 ₽', icon: 'Scissors' },
  { id: 6, name: 'Детская стрижка', price: '1 200 ₽', icon: 'Heart' }
];

const masters = [
  {
    id: 1,
    name: 'Анна Петрова',
    specialty: 'Топ-стилист, окрашивание',
    experience: '12 лет',
    image: 'https://cdn.poehali.dev/projects/d4096a7f-5582-458b-8dba-d2947963fcf9/files/46129b6e-564d-4a08-8a31-625d048e1182.jpg'
  },
  {
    id: 2,
    name: 'Елена Соколова',
    specialty: 'Стилист-универсал',
    experience: '8 лет',
    image: 'https://cdn.poehali.dev/projects/d4096a7f-5582-458b-8dba-d2947963fcf9/files/46129b6e-564d-4a08-8a31-625d048e1182.jpg'
  },
  {
    id: 3,
    name: 'Мария Волкова',
    specialty: 'Колорист',
    experience: '10 лет',
    image: 'https://cdn.poehali.dev/projects/d4096a7f-5582-458b-8dba-d2947963fcf9/files/46129b6e-564d-4a08-8a31-625d048e1182.jpg'
  }
];

const galleryImages = [
  'https://cdn.poehali.dev/projects/d4096a7f-5582-458b-8dba-d2947963fcf9/files/cadc21f2-c514-4464-b535-4fbf183eb502.jpg',
  'https://cdn.poehali.dev/projects/d4096a7f-5582-458b-8dba-d2947963fcf9/files/cadc21f2-c514-4464-b535-4fbf183eb502.jpg',
  'https://cdn.poehali.dev/projects/d4096a7f-5582-458b-8dba-d2947963fcf9/files/cadc21f2-c514-4464-b535-4fbf183eb502.jpg',
  'https://cdn.poehali.dev/projects/d4096a7f-5582-458b-8dba-d2947963fcf9/files/cadc21f2-c514-4464-b535-4fbf183eb502.jpg',
  'https://cdn.poehali.dev/projects/d4096a7f-5582-458b-8dba-d2947963fcf9/files/cadc21f2-c514-4464-b535-4fbf183eb502.jpg',
  'https://cdn.poehali.dev/projects/d4096a7f-5582-458b-8dba-d2947963fcf9/files/cadc21f2-c514-4464-b535-4fbf183eb502.jpg'
];

const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

export default function Index() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedMaster, setSelectedMaster] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBooking = () => {
    if (selectedService && selectedMaster && selectedDate && selectedTime && clientName && clientPhone) {
      alert(`Запись успешно создана!\n\nУслуга: ${services.find(s => s.id.toString() === selectedService)?.name}\nМастер: ${masters.find(m => m.id.toString() === selectedMaster)?.name}\nДата: ${selectedDate.toLocaleDateString('ru-RU')}\nВремя: ${selectedTime}\nКлиент: ${clientName}\nТелефон: ${clientPhone}`);
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  const BookingForm = () => (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label>Выберите услугу</Label>
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger>
            <SelectValue placeholder="Услуга" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.id} value={service.id.toString()}>
                {service.name} - {service.price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Выберите мастера</Label>
        <Select value={selectedMaster} onValueChange={setSelectedMaster}>
          <SelectTrigger>
            <SelectValue placeholder="Мастер" />
          </SelectTrigger>
          <SelectContent>
            {masters.map((master) => (
              <SelectItem key={master.id} value={master.id.toString()}>
                {master.name} - {master.specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Выберите дату</Label>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          disabled={(date) => date < new Date()}
        />
      </div>

      <div className="space-y-2">
        <Label>Выберите время</Label>
        <div className="grid grid-cols-5 gap-2">
          {timeSlots.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? 'default' : 'outline'}
              onClick={() => setSelectedTime(time)}
              className="w-full"
            >
              {time}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Ваше имя</Label>
        <Input
          placeholder="Введите ваше имя"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Телефон</Label>
        <Input
          placeholder="+7 (999) 123-45-67"
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
        />
      </div>

      <Button 
        onClick={handleBooking}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
      >
        Подтвердить запись
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Beauty Studio
            </h1>
            <div className="hidden md:flex gap-6">
              {['Главная', 'Услуги', 'Мастера', 'Галерея', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  Записаться
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Онлайн-запись</DialogTitle>
                </DialogHeader>
                <BookingForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <section id="главная" className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Создаём красоту
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  каждый день
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Профессиональная парикмахерская с опытными мастерами и современными техниками окрашивания
              </p>
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      Записаться онлайн
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Онлайн-запись</DialogTitle>
                    </DialogHeader>
                    <BookingForm />
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('галерея')}>
                  Наши работы
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img
                src="https://cdn.poehali.dev/projects/d4096a7f-5582-458b-8dba-d2947963fcf9/files/b86e67ac-514c-448d-9eee-f840a2f3dbec.jpg"
                alt="Салон красоты"
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="услуги" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10">
                      <Icon name={service.icon as any} className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {service.price}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="мастера" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Наши мастера</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {masters.map((master) => (
              <Card key={master.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={master.image}
                  alt={master.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{master.name}</h3>
                  <p className="text-muted-foreground mb-1">{master.specialty}</p>
                  <p className="text-sm text-primary font-medium">Опыт: {master.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="галерея" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Галерея работ</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-2xl aspect-square hover:scale-105 transition-transform">
                <img
                  src={image}
                  alt={`Работа ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">Ежедневно: 10:00 - 21:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@beautystudio.ru</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <Icon name="Instagram" className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2">Следите за нами</h3>
                <p className="text-muted-foreground mb-4">@beautystudio_moscow</p>
                <Button variant="outline">Подписаться</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm opacity-80">© 2024 Beauty Studio. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}