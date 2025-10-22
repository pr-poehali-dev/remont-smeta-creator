import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface WorkItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  category: 'work' | 'material';
}

interface Estimate {
  id: string;
  number: string;
  client: string;
  object: string;
  date: string;
  status: 'draft' | 'active' | 'completed';
  items: WorkItem[];
  totalAmount: number;
  paidAmount: number;
  contractId?: string;
  additionalWorks: WorkItem[];
}

interface Act {
  id: string;
  number: string;
  estimateId: string;
  estimateNumber: string;
  client: string;
  object: string;
  date: string;
  status: 'draft' | 'signed' | 'paid';
  items: WorkItem[];
  totalAmount: number;
}

interface Contract {
  id: string;
  number: string;
  estimateId: string;
  estimateNumber: string;
  client: string;
  object: string;
  date: string;
  signDate?: string;
  status: 'draft' | 'signed' | 'active' | 'completed';
  totalAmount: number;
  terms: string;
}

interface Contractor {
  id: string;
  name: string;
  inn: string;
  phone: string;
  email: string;
  type: 'individual' | 'legal';
  projects: number;
  totalAmount: number;
}

interface Payment {
  id: string;
  date: string;
  estimateId: string;
  estimateNumber: string;
  client: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
}

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [estimates, setEstimates] = useState<Estimate[]>([
    {
      id: '1',
      number: 'СМ-2024-001',
      client: 'ООО "Строй-Инвест"',
      object: 'ул. Ленина, 45, кв. 12',
      date: '2024-10-15',
      status: 'active',
      items: [],
      totalAmount: 850000,
      paidAmount: 340000,
      contractId: 'c1',
      additionalWorks: []
    },
    {
      id: '2',
      number: 'СМ-2024-002',
      client: 'Иванов Иван Иванович',
      object: 'пр. Мира, 78, кв. 5',
      date: '2024-10-18',
      status: 'active',
      items: [],
      totalAmount: 420000,
      paidAmount: 420000,
      additionalWorks: []
    },
    {
      id: '3',
      number: 'СМ-2024-003',
      client: 'ООО "РемонтСтрой"',
      object: 'ул. Советская, 12, кв. 89',
      date: '2024-10-20',
      status: 'draft',
      items: [],
      totalAmount: 650000,
      paidAmount: 0,
      additionalWorks: []
    },
  ]);

  const [acts, setActs] = useState<Act[]>([
    {
      id: 'a1',
      number: 'АКТ-2024-001',
      estimateId: '1',
      estimateNumber: 'СМ-2024-001',
      client: 'ООО "Строй-Инвест"',
      object: 'ул. Ленина, 45, кв. 12',
      date: '2024-10-20',
      status: 'signed',
      items: [
        { id: 'i1', name: 'Демонтаж старой отделки', unit: 'м²', quantity: 45, price: 450, category: 'work' },
        { id: 'i2', name: 'Штукатурка стен по маякам', unit: 'м²', quantity: 120, price: 650, category: 'work' },
      ],
      totalAmount: 98250
    }
  ]);

  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: 'c1',
      number: 'ДОГ-2024-001',
      estimateId: '1',
      estimateNumber: 'СМ-2024-001',
      client: 'ООО "Строй-Инвест"',
      object: 'ул. Ленина, 45, кв. 12',
      date: '2024-10-15',
      signDate: '2024-10-16',
      status: 'active',
      totalAmount: 850000,
      terms: 'Ремонт квартиры по утвержденной смете. Срок выполнения: 60 дней.'
    }
  ]);

  const [contractors, setContractors] = useState<Contractor[]>([
    { id: 'ct1', name: 'ООО "Строй-Инвест"', inn: '7701234567', phone: '+7 (495) 123-45-67', email: 'info@stroyinvest.ru', type: 'legal', projects: 3, totalAmount: 1250000 },
    { id: 'ct2', name: 'Иванов Иван Иванович', inn: '770198765432', phone: '+7 (926) 555-12-34', email: 'ivanov@mail.ru', type: 'individual', projects: 1, totalAmount: 420000 },
    { id: 'ct3', name: 'ООО "РемонтСтрой"', inn: '7709876543', phone: '+7 (495) 987-65-43', email: 'contact@remontstroi.ru', type: 'legal', projects: 2, totalAmount: 980000 },
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    { id: 'p1', date: '2024-10-16', estimateId: '1', estimateNumber: 'СМ-2024-001', client: 'ООО "Строй-Инвест"', amount: 340000, type: 'income', category: 'Аванс', description: 'Предоплата 40%' },
    { id: 'p2', date: '2024-10-18', estimateId: '2', estimateNumber: 'СМ-2024-002', client: 'Иванов И.И.', amount: 420000, type: 'income', category: 'Полная оплата', description: 'Оплата по акту' },
    { id: 'p3', date: '2024-10-19', estimateId: '1', estimateNumber: 'СМ-2024-001', client: 'Поставщик материалов', amount: 85000, type: 'expense', category: 'Материалы', description: 'Закупка материалов для СМ-2024-001' },
  ]);

  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [estimateItems, setEstimateItems] = useState<WorkItem[]>([]);
  const [isCreateActDialogOpen, setIsCreateActDialogOpen] = useState(false);
  const [isCreateContractDialogOpen, setIsCreateContractDialogOpen] = useState(false);
  const [isAdditionalWorksDialogOpen, setIsAdditionalWorksDialogOpen] = useState(false);
  const [isAddContractorDialogOpen, setIsAddContractorDialogOpen] = useState(false);
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);

  const totalRevenue = estimates.reduce((sum, est) => sum + est.totalAmount, 0);
  const totalPaid = estimates.reduce((sum, est) => sum + est.paidAmount, 0);
  const activeEstimates = estimates.filter(e => e.status === 'active').length;
  const completedEstimates = estimates.filter(e => e.status === 'completed').length;

  const totalIncome = payments.filter(p => p.type === 'income').reduce((sum, p) => sum + p.amount, 0);
  const totalExpense = payments.filter(p => p.type === 'expense').reduce((sum, p) => sum + p.amount, 0);
  const profit = totalIncome - totalExpense;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'signed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'paid': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Черновик';
      case 'active': return 'В работе';
      case 'completed': return 'Завершен';
      case 'signed': return 'Подписан';
      case 'paid': return 'Оплачен';
      default: return status;
    }
  };

  const handleCreateEstimate = () => {
    toast({
      title: "Смета создана",
      description: "Новая смета успешно добавлена в систему",
    });
    setIsCreateDialogOpen(false);
  };

  const handleViewEstimate = (estimate: Estimate) => {
    setSelectedEstimate(estimate);
    setEstimateItems(estimate.items.length > 0 ? estimate.items : [
      { id: 'i1', name: 'Демонтаж старой отделки', unit: 'м²', quantity: 45, price: 450, category: 'work' },
      { id: 'i2', name: 'Штукатурка стен по маякам', unit: 'м²', quantity: 120, price: 650, category: 'work' },
      { id: 'i3', name: 'Шпаклевка стен', unit: 'м²', quantity: 120, price: 380, category: 'work' },
      { id: 'i4', name: 'Укладка плитки', unit: 'м²', quantity: 28, price: 1200, category: 'work' },
      { id: 'i5', name: 'Плитка керамическая', unit: 'м²', quantity: 30, price: 890, category: 'material' },
      { id: 'i6', name: 'Цемент М500', unit: 'кг', quantity: 250, price: 12, category: 'material' },
    ]);
    setIsDetailDialogOpen(true);
  };

  const handleAddItem = () => {
    const newItem: WorkItem = {
      id: `i${estimateItems.length + 1}`,
      name: 'Новая позиция',
      unit: 'шт',
      quantity: 1,
      price: 0,
      category: 'work'
    };
    setEstimateItems([...estimateItems, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setEstimateItems(estimateItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return estimateItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleCreateAct = () => {
    if (!selectedEstimate) return;
    
    const newAct: Act = {
      id: `a${acts.length + 1}`,
      number: `АКТ-2024-${String(acts.length + 1).padStart(3, '0')}`,
      estimateId: selectedEstimate.id,
      estimateNumber: selectedEstimate.number,
      client: selectedEstimate.client,
      object: selectedEstimate.object,
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      items: estimateItems,
      totalAmount: calculateTotal()
    };
    
    setActs([...acts, newAct]);
    toast({
      title: "Акт создан",
      description: `Создан акт ${newAct.number} на сумму ${newAct.totalAmount.toLocaleString('ru-RU')} ₽`,
    });
    setIsDetailDialogOpen(false);
    setActiveTab('acts');
  };

  const handleCreateContract = () => {
    if (!selectedEstimate) return;
    
    const newContract: Contract = {
      id: `c${contracts.length + 1}`,
      number: `ДОГ-2024-${String(contracts.length + 1).padStart(3, '0')}`,
      estimateId: selectedEstimate.id,
      estimateNumber: selectedEstimate.number,
      client: selectedEstimate.client,
      object: selectedEstimate.object,
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      totalAmount: calculateTotal(),
      terms: 'Ремонт квартиры по утвержденной смете.'
    };
    
    setContracts([...contracts, newContract]);
    toast({
      title: "Договор создан",
      description: `Создан договор ${newContract.number} на сумму ${newContract.totalAmount.toLocaleString('ru-RU')} ₽`,
    });
    setIsDetailDialogOpen(false);
    setActiveTab('contracts');
  };

  const handleAddAdditionalWork = () => {
    if (!selectedEstimate) return;
    
    setSelectedEstimate(selectedEstimate);
    setIsAdditionalWorksDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calculator" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">СметаПро</h1>
                <p className="text-sm text-slate-600">Управление ремонтными работами</p>
              </div>
            </div>
            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              Новая смета
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 h-auto p-1">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="estimates" className="gap-2">
              <Icon name="FileText" size={16} />
              <span className="hidden sm:inline">Сметы</span>
            </TabsTrigger>
            <TabsTrigger value="acts" className="gap-2">
              <Icon name="FileCheck" size={16} />
              <span className="hidden sm:inline">Акты</span>
            </TabsTrigger>
            <TabsTrigger value="contracts" className="gap-2">
              <Icon name="FileSignature" size={16} />
              <span className="hidden sm:inline">Договоры</span>
            </TabsTrigger>
            <TabsTrigger value="contractors" className="gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Контрагенты</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="gap-2">
              <Icon name="Wallet" size={16} />
              <span className="hidden sm:inline">Финансы</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <Icon name="BarChart3" size={16} />
              <span className="hidden sm:inline">Отчёты</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Общая выручка</CardDescription>
                  <CardTitle className="text-3xl">{totalRevenue.toLocaleString('ru-RU')} ₽</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Icon name="TrendingUp" size={16} />
                    <span>+12% за месяц</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Оплачено</CardDescription>
                  <CardTitle className="text-3xl">{totalPaid.toLocaleString('ru-RU')} ₽</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-600">
                    Задолженность: {(totalRevenue - totalPaid).toLocaleString('ru-RU')} ₽
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Активные проекты</CardDescription>
                  <CardTitle className="text-3xl">{activeEstimates}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-600">
                    Завершено: {completedEstimates}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Прибыль</CardDescription>
                  <CardTitle className="text-3xl">{profit.toLocaleString('ru-RU')} ₽</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-600">
                    Маржа: {((profit / totalIncome) * 100).toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Недавние сметы</CardTitle>
                  <CardDescription>Последние созданные проекты</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {estimates.slice(0, 3).map((est) => (
                      <div key={est.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-semibold">{est.number}</div>
                          <div className="text-sm text-slate-600">{est.client}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{est.totalAmount.toLocaleString('ru-RU')} ₽</div>
                          <Badge variant="outline" className={getStatusColor(est.status)}>
                            {getStatusText(est.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Последние платежи</CardTitle>
                  <CardDescription>История финансовых операций</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            payment.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <Icon name={payment.type === 'income' ? 'ArrowDownLeft' : 'ArrowUpRight'} 
                              size={16} 
                              className={payment.type === 'income' ? 'text-green-600' : 'text-red-600'} 
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{payment.category}</div>
                            <div className="text-xs text-slate-600">{payment.client}</div>
                          </div>
                        </div>
                        <div className={`font-semibold ${payment.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {payment.type === 'income' ? '+' : '-'}{payment.amount.toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="estimates">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Сметы</CardTitle>
                    <CardDescription>Управление сметами и расчётами</CardDescription>
                  </div>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Icon name="Plus" size={18} />
                        Создать смету
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Новая смета</DialogTitle>
                        <DialogDescription>Создание новой сметы на ремонтные работы</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Клиент</Label>
                            <Input placeholder="Название компании или ФИО" />
                          </div>
                          <div className="space-y-2">
                            <Label>Объект</Label>
                            <Input placeholder="Адрес объекта" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Номер сметы</Label>
                            <Input placeholder="СМ-2024-004" />
                          </div>
                          <div className="space-y-2">
                            <Label>Дата</Label>
                            <Input type="date" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Отмена
                        </Button>
                        <Button onClick={handleCreateEstimate}>
                          Создать смету
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Номер</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Объект</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Сумма</TableHead>
                      <TableHead className="text-right">Оплачено</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estimates.map((estimate) => (
                      <TableRow key={estimate.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium">{estimate.number}</TableCell>
                        <TableCell>{estimate.client}</TableCell>
                        <TableCell className="text-sm text-slate-600">{estimate.object}</TableCell>
                        <TableCell className="text-sm">{new Date(estimate.date).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(estimate.status)}>
                            {getStatusText(estimate.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {estimate.totalAmount.toLocaleString('ru-RU')} ₽
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="text-sm">
                            <span className="font-medium">{estimate.paidAmount.toLocaleString('ru-RU')} ₽</span>
                            <div className="text-xs text-slate-500">
                              {Math.round((estimate.paidAmount / estimate.totalAmount) * 100)}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm" onClick={() => handleViewEstimate(estimate)}>
                              <Icon name="Eye" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="FileText" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="acts">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Акты выполненных работ</CardTitle>
                    <CardDescription>Управление актами и подписание документов</CardDescription>
                  </div>
                  <Dialog open={isCreateActDialogOpen} onOpenChange={setIsCreateActDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Icon name="Plus" size={18} />
                        Создать акт
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Новый акт выполненных работ</DialogTitle>
                        <DialogDescription>Выберите смету для создания акта</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label>Смета</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите смету" />
                            </SelectTrigger>
                            <SelectContent>
                              {estimates.map((est) => (
                                <SelectItem key={est.id} value={est.id}>
                                  {est.number} - {est.client}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Номер акта</Label>
                            <Input placeholder="АКТ-2024-002" />
                          </div>
                          <div className="space-y-2">
                            <Label>Дата</Label>
                            <Input type="date" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Примечание</Label>
                          <Textarea placeholder="Дополнительная информация" rows={3} />
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <Button variant="outline" onClick={() => setIsCreateActDialogOpen(false)}>
                          Отмена
                        </Button>
                        <Button onClick={() => {
                          toast({
                            title: "Акт создан",
                            description: "Новый акт успешно добавлен в систему",
                          });
                          setIsCreateActDialogOpen(false);
                        }}>
                          Создать акт
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {acts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="FileCheck" size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Создайте первый акт</h3>
                    <p className="text-slate-600 mb-6">Акты создаются на основе существующих смет</p>
                    <Button onClick={() => setIsCreateActDialogOpen(true)}>
                      <Icon name="Plus" size={18} className="mr-2" />
                      Создать акт
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Номер акта</TableHead>
                        <TableHead>Смета</TableHead>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Объект</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Сумма</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {acts.map((act) => (
                        <TableRow key={act.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium">{act.number}</TableCell>
                          <TableCell className="text-sm text-slate-600">{act.estimateNumber}</TableCell>
                          <TableCell>{act.client}</TableCell>
                          <TableCell className="text-sm text-slate-600">{act.object}</TableCell>
                          <TableCell className="text-sm">{new Date(act.date).toLocaleDateString('ru-RU')}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(act.status)}>
                              {getStatusText(act.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {act.totalAmount.toLocaleString('ru-RU')} ₽
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="sm">
                                <Icon name="Eye" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Download" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Icon name="Send" size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Договоры</CardTitle>
                    <CardDescription>Управление договорами с контрагентами</CardDescription>
                  </div>
                  <Button className="gap-2" onClick={() => setIsCreateContractDialogOpen(true)}>
                    <Icon name="Plus" size={18} />
                    Создать договор
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Номер договора</TableHead>
                      <TableHead>Смета</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Дата создания</TableHead>
                      <TableHead>Дата подписания</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Сумма</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.map((contract) => (
                      <TableRow key={contract.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium">{contract.number}</TableCell>
                        <TableCell className="text-sm text-slate-600">{contract.estimateNumber}</TableCell>
                        <TableCell>{contract.client}</TableCell>
                        <TableCell className="text-sm">{new Date(contract.date).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell className="text-sm">
                          {contract.signDate ? new Date(contract.signDate).toLocaleDateString('ru-RU') : '—'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(contract.status)}>
                            {getStatusText(contract.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {contract.totalAmount.toLocaleString('ru-RU')} ₽
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm">
                              <Icon name="Eye" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Download" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contractors">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Контрагенты</CardTitle>
                    <CardDescription>База клиентов и подрядчиков</CardDescription>
                  </div>
                  <Button className="gap-2" onClick={() => setIsAddContractorDialogOpen(true)}>
                    <Icon name="Plus" size={18} />
                    Добавить контрагента
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Наименование</TableHead>
                      <TableHead>ИНН</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Проектов</TableHead>
                      <TableHead className="text-right">Общая сумма</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contractors.map((contractor) => (
                      <TableRow key={contractor.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium">{contractor.name}</TableCell>
                        <TableCell className="text-sm">{contractor.inn}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {contractor.type === 'legal' ? 'Юр. лицо' : 'Физ. лицо'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{contractor.phone}</TableCell>
                        <TableCell className="text-sm text-slate-600">{contractor.email}</TableCell>
                        <TableCell className="text-right">{contractor.projects}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {contractor.totalAmount.toLocaleString('ru-RU')} ₽
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm">
                              <Icon name="Eye" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Поступления</CardDescription>
                    <CardTitle className="text-3xl text-green-600">
                      +{totalIncome.toLocaleString('ru-RU')} ₽
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-slate-600">
                      {payments.filter(p => p.type === 'income').length} операций
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Расходы</CardDescription>
                    <CardTitle className="text-3xl text-red-600">
                      -{totalExpense.toLocaleString('ru-RU')} ₽
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-slate-600">
                      {payments.filter(p => p.type === 'expense').length} операций
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Чистая прибыль</CardDescription>
                    <CardTitle className="text-3xl">
                      {profit.toLocaleString('ru-RU')} ₽
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-slate-600">
                      Маржа: {((profit / totalIncome) * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Финансовые операции</CardTitle>
                      <CardDescription>История доходов и расходов</CardDescription>
                    </div>
                    <Button className="gap-2" onClick={() => setIsAddPaymentDialogOpen(true)}>
                      <Icon name="Plus" size={18} />
                      Добавить операцию
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Дата</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Смета</TableHead>
                        <TableHead>Контрагент</TableHead>
                        <TableHead>Описание</TableHead>
                        <TableHead className="text-right">Сумма</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id} className="hover:bg-slate-50">
                          <TableCell className="text-sm">{new Date(payment.date).toLocaleDateString('ru-RU')}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={payment.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {payment.type === 'income' ? 'Доход' : 'Расход'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{payment.category}</TableCell>
                          <TableCell className="text-sm text-slate-600">{payment.estimateNumber}</TableCell>
                          <TableCell className="text-sm">{payment.client}</TableCell>
                          <TableCell className="text-sm text-slate-600">{payment.description}</TableCell>
                          <TableCell className={`text-right font-semibold ${payment.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {payment.type === 'income' ? '+' : '-'}{payment.amount.toLocaleString('ru-RU')} ₽
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Отчёт по проектам</CardTitle>
                  <CardDescription>Статистика выполнения смет</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <div className="text-sm text-slate-600">Всего проектов</div>
                        <div className="text-2xl font-bold">{estimates.length}</div>
                      </div>
                      <Icon name="FileText" size={32} className="text-slate-400" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-bold">{estimates.filter(e => e.status === 'draft').length}</div>
                        <div className="text-xs text-slate-600">Черновики</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-blue-600">{activeEstimates}</div>
                        <div className="text-xs text-slate-600">В работе</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-green-600">{completedEstimates}</div>
                        <div className="text-xs text-slate-600">Завершено</div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="text-sm text-slate-600 mb-2">Средний чек</div>
                      <div className="text-2xl font-bold">
                        {(totalRevenue / estimates.length).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-600 mb-2">Процент оплаты</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                            style={{ width: `${(totalPaid / totalRevenue) * 100}%` }}
                          />
                        </div>
                        <div className="text-sm font-semibold">
                          {Math.round((totalPaid / totalRevenue) * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Финансовый отчёт</CardTitle>
                  <CardDescription>Анализ доходов и расходов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <div className="text-sm text-green-600">Доходы</div>
                        <div className="text-2xl font-bold text-green-700">+{totalIncome.toLocaleString('ru-RU')} ₽</div>
                      </div>
                      <Icon name="TrendingUp" size={32} className="text-green-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <div className="text-sm text-red-600">Расходы</div>
                        <div className="text-2xl font-bold text-red-700">-{totalExpense.toLocaleString('ru-RU')} ₽</div>
                      </div>
                      <Icon name="TrendingDown" size={32} className="text-red-500" />
                    </div>

                    <Separator />

                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">Чистая прибыль</div>
                      <div className="text-3xl font-bold">{profit.toLocaleString('ru-RU')} ₽</div>
                      <div className="text-sm text-slate-600 mt-2">
                        Рентабельность: {((profit / totalIncome) * 100).toFixed(1)}%
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-600 mb-3">Структура расходов</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Материалы</span>
                          <span className="font-semibold">85 000 ₽</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <span>Прочие расходы</span>
                          <span>—</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Топ контрагентов</CardTitle>
                  <CardDescription>Клиенты по объёму работ</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Позиция</TableHead>
                        <TableHead>Наименование</TableHead>
                        <TableHead className="text-right">Проектов</TableHead>
                        <TableHead className="text-right">Общая сумма</TableHead>
                        <TableHead className="text-right">Средний чек</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contractors
                        .sort((a, b) => b.totalAmount - a.totalAmount)
                        .slice(0, 5)
                        .map((contractor, index) => (
                          <TableRow key={contractor.id}>
                            <TableCell className="font-bold text-lg text-slate-400">
                              #{index + 1}
                            </TableCell>
                            <TableCell className="font-medium">{contractor.name}</TableCell>
                            <TableCell className="text-right">{contractor.projects}</TableCell>
                            <TableCell className="text-right font-semibold">
                              {contractor.totalAmount.toLocaleString('ru-RU')} ₽
                            </TableCell>
                            <TableCell className="text-right text-slate-600">
                              {(contractor.totalAmount / contractor.projects).toLocaleString('ru-RU')} ₽
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Icon name="FileText" size={24} />
              Смета {selectedEstimate?.number}
            </DialogTitle>
            <DialogDescription>
              {selectedEstimate?.client} • {selectedEstimate?.object}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-sm text-slate-600 mb-1">Дата</p>
                <p className="font-semibold">{selectedEstimate && new Date(selectedEstimate.date).toLocaleDateString('ru-RU')}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Статус</p>
                <Badge variant="outline" className={selectedEstimate ? getStatusColor(selectedEstimate.status) : ''}>
                  {selectedEstimate && getStatusText(selectedEstimate.status)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Общая сумма</p>
                <p className="font-bold text-lg text-primary">
                  {calculateTotal().toLocaleString('ru-RU')} ₽
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Позиции сметы</h3>
                <Button variant="outline" size="sm" onClick={handleAddItem} className="gap-2">
                  <Icon name="Plus" size={16} />
                  Добавить позицию
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Наименование</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Ед. изм.</TableHead>
                    <TableHead className="text-right">Кол-во</TableHead>
                    <TableHead className="text-right">Цена</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estimateItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input 
                          value={item.name} 
                          onChange={(e) => {
                            setEstimateItems(estimateItems.map(i => 
                              i.id === item.id ? {...i, name: e.target.value} : i
                            ));
                          }}
                          className="border-0 focus-visible:ring-1"
                        />
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={item.category}
                          onValueChange={(value: 'work' | 'material') => {
                            setEstimateItems(estimateItems.map(i => 
                              i.id === item.id ? {...i, category: value} : i
                            ));
                          }}
                        >
                          <SelectTrigger className="w-[110px] border-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="work">Работа</SelectItem>
                            <SelectItem value="material">Материал</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={item.unit} 
                          onChange={(e) => {
                            setEstimateItems(estimateItems.map(i => 
                              i.id === item.id ? {...i, unit: e.target.value} : i
                            ));
                          }}
                          className="w-20 border-0 focus-visible:ring-1"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => {
                            setEstimateItems(estimateItems.map(i => 
                              i.id === item.id ? {...i, quantity: Number(e.target.value)} : i
                            ));
                          }}
                          className="w-20 text-right border-0 focus-visible:ring-1"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input 
                          type="number" 
                          value={item.price} 
                          onChange={(e) => {
                            setEstimateItems(estimateItems.map(i => 
                              i.id === item.id ? {...i, price: Number(e.target.value)} : i
                            ));
                          }}
                          className="w-24 text-right border-0 focus-visible:ring-1"
                        />
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {(item.quantity * item.price).toLocaleString('ru-RU')} ₽
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Icon name="Trash2" size={16} className="text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-slate-50 font-bold">
                    <TableCell colSpan={5} className="text-right">ИТОГО:</TableCell>
                    <TableCell className="text-right text-lg">
                      {calculateTotal().toLocaleString('ru-RU')} ₽
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button variant="outline" onClick={handleAddAdditionalWork}>
                <Icon name="FilePlus" size={18} className="mr-2" />
                Допработы
              </Button>
              <Button variant="outline">
                <Icon name="FileDown" size={18} className="mr-2" />
                Экспорт в PDF
              </Button>
              <Button variant="outline" onClick={handleCreateContract}>
                <Icon name="FileSignature" size={18} className="mr-2" />
                Создать договор
              </Button>
              <Button variant="outline" onClick={handleCreateAct}>
                <Icon name="FileCheck" size={18} className="mr-2" />
                Создать акт
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Смета сохранена",
                  description: "Все изменения успешно применены",
                });
                setIsDetailDialogOpen(false);
              }}>
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAdditionalWorksDialogOpen} onOpenChange={setIsAdditionalWorksDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Дополнительные работы</DialogTitle>
            <DialogDescription>
              Смета {selectedEstimate?.number} • {selectedEstimate?.client}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Что такое дополнительные работы?</p>
                  <p>Это работы, которые не были включены в первоначальную смету, но потребовались в процессе выполнения проекта. Они учитываются отдельно и увеличивают общую стоимость проекта.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Позиции дополнительных работ</Label>
                <Button variant="outline" size="sm" onClick={handleAddItem}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить
                </Button>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Наименование</TableHead>
                      <TableHead>Ед.</TableHead>
                      <TableHead className="text-right">Кол-во</TableHead>
                      <TableHead className="text-right">Цена</TableHead>
                      <TableHead className="text-right">Сумма</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-sm text-slate-500 text-center" colSpan={6}>
                        Добавьте первую позицию дополнительных работ
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Итого дополнительных работ:</p>
                <p className="text-2xl font-bold text-primary">0 ₽</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsAdditionalWorksDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Дополнительные работы сохранены",
                    description: "Позиции добавлены к смете",
                  });
                  setIsAdditionalWorksDialogOpen(false);
                }}>
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddContractorDialogOpen} onOpenChange={setIsAddContractorDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Новый контрагент</DialogTitle>
            <DialogDescription>Добавление клиента или подрядчика в базу</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Тип контрагента</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="legal">Юридическое лицо</SelectItem>
                  <SelectItem value="individual">Физическое лицо</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Наименование / ФИО</Label>
              <Input placeholder="ООО Строй-Инвест или Иванов Иван Иванович" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ИНН</Label>
                <Input placeholder="7701234567" />
              </div>
              <div className="space-y-2">
                <Label>Телефон</Label>
                <Input placeholder="+7 (___) ___-__-__" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Примечание</Label>
              <Textarea placeholder="Дополнительная информация о контрагенте" rows={3} />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsAddContractorDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => {
              toast({
                title: "Контрагент добавлен",
                description: "Новый контрагент успешно добавлен в базу",
              });
              setIsAddContractorDialogOpen(false);
            }}>
              Добавить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Новая финансовая операция</DialogTitle>
            <DialogDescription>Добавление дохода или расхода</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Тип операции</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Доход</SelectItem>
                    <SelectItem value="expense">Расход</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Дата</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Смета</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите смету" />
                </SelectTrigger>
                <SelectContent>
                  {estimates.map((est) => (
                    <SelectItem key={est.id} value={est.id}>
                      {est.number} - {est.client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Категория</Label>
                <Input placeholder="Например: Аванс, Материалы" />
              </div>
              <div className="space-y-2">
                <Label>Сумма</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Контрагент</Label>
              <Input placeholder="Наименование контрагента" />
            </div>
            <div className="space-y-2">
              <Label>Описание</Label>
              <Textarea placeholder="Комментарий к операции" rows={3} />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsAddPaymentDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => {
              toast({
                title: "Операция добавлена",
                description: "Финансовая операция успешно записана",
              });
              setIsAddPaymentDialogOpen(false);
            }}>
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
