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
    },
  ]);

  const [workDirectory] = useState<WorkItem[]>([
    { id: 'w1', name: 'Демонтаж стен', unit: 'м²', quantity: 1, price: 450, category: 'work' },
    { id: 'w2', name: 'Штукатурка стен', unit: 'м²', quantity: 1, price: 650, category: 'work' },
    { id: 'w3', name: 'Укладка плитки', unit: 'м²', quantity: 1, price: 1200, category: 'work' },
    { id: 'w4', name: 'Монтаж гипсокартона', unit: 'м²', quantity: 1, price: 550, category: 'work' },
    { id: 'm1', name: 'Цемент М500', unit: 'кг', quantity: 1, price: 12, category: 'material' },
    { id: 'm2', name: 'Плитка керамическая', unit: 'м²', quantity: 1, price: 890, category: 'material' },
    { id: 'm3', name: 'Гипсокартон ГКЛ', unit: 'лист', quantity: 1, price: 350, category: 'material' },
  ]);

  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [estimateItems, setEstimateItems] = useState<WorkItem[]>([]);
  const [isCreateActDialogOpen, setIsCreateActDialogOpen] = useState(false);
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

  const totalRevenue = estimates.reduce((sum, est) => sum + est.totalAmount, 0);
  const totalPaid = estimates.reduce((sum, est) => sum + est.paidAmount, 0);
  const activeEstimates = estimates.filter(e => e.status === 'active').length;
  const completedEstimates = estimates.filter(e => e.status === 'completed').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Черновик';
      case 'active': return 'В работе';
      case 'completed': return 'Завершен';
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

  const getActStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'signed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'paid': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Черновик';
      case 'signed': return 'Подписан';
      case 'paid': return 'Оплачен';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calculator" className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">СметаПро</h1>
                <p className="text-sm text-slate-500">Управление сметами и актами</p>
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
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={18} />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="estimates" className="gap-2">
              <Icon name="FileText" size={18} />
              Сметы
            </TabsTrigger>
            <TabsTrigger value="acts" className="gap-2">
              <Icon name="FileCheck" size={18} />
              Акты
            </TabsTrigger>
            <TabsTrigger value="directory" className="gap-2">
              <Icon name="Book" size={18} />
              Справочник
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription className="text-xs font-medium">Всего смет</CardDescription>
                  <CardTitle className="text-3xl font-bold text-slate-900">{estimates.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="TrendingUp" size={16} className="text-green-600" />
                    <span>+2 за месяц</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription className="text-xs font-medium">Активных смет</CardDescription>
                  <CardTitle className="text-3xl font-bold text-slate-900">{activeEstimates}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="Activity" size={16} className="text-blue-600" />
                    <span>В работе</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription className="text-xs font-medium">Общая сумма</CardDescription>
                  <CardTitle className="text-3xl font-bold text-slate-900">
                    {totalRevenue.toLocaleString('ru-RU')} ₽
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="Wallet" size={16} className="text-purple-600" />
                    <span>По всем сметам</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription className="text-xs font-medium">Получено</CardDescription>
                  <CardTitle className="text-3xl font-bold text-slate-900">
                    {totalPaid.toLocaleString('ru-RU')} ₽
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <span>{Math.round((totalPaid / totalRevenue) * 100)}% оплачено</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" size={20} />
                    Статистика по статусам
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span className="font-medium">Черновики</span>
                      </div>
                      <span className="text-2xl font-bold">{estimates.filter(e => e.status === 'draft').length}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="font-medium">В работе</span>
                      </div>
                      <span className="text-2xl font-bold">{activeEstimates}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="font-medium">Завершено</span>
                      </div>
                      <span className="text-2xl font-bold">{completedEstimates}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" size={20} />
                    Финансовая аналитика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Процент оплаты</span>
                        <span className="text-sm font-bold">{Math.round((totalPaid / totalRevenue) * 100)}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                          style={{ width: `${(totalPaid / totalRevenue) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="pt-4 space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Оплачено</span>
                        <span className="text-lg font-bold text-green-700">
                          {totalPaid.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium">К оплате</span>
                        <span className="text-lg font-bold text-orange-700">
                          {(totalRevenue - totalPaid).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" size={20} />
                  Последние сметы
                </CardTitle>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estimates.slice(0, 5).map((estimate) => (
                      <TableRow key={estimate.id} className="cursor-pointer hover:bg-slate-50">
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estimates">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Список смет</CardTitle>
                    <CardDescription>Управление сметами и документами</CardDescription>
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
                        <DialogDescription>Заполните данные для создания новой сметы</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
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
                        <div className="space-y-2">
                          <Label>Клиент</Label>
                          <Input placeholder="Название организации или ФИО" />
                        </div>
                        <div className="space-y-2">
                          <Label>Объект</Label>
                          <Input placeholder="Адрес объекта" />
                        </div>
                        <div className="space-y-2">
                          <Label>Описание работ</Label>
                          <Textarea placeholder="Краткое описание работ по смете" rows={3} />
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
                          <span className="text-green-700 font-medium">
                            {estimate.paidAmount.toLocaleString('ru-RU')} ₽
                          </span>
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
                            <Badge variant="outline" className={getActStatusColor(act.status)}>
                              {getActStatusText(act.status)}
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

          <TabsContent value="directory">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Справочник работ и материалов</CardTitle>
                    <CardDescription>Каталог позиций для быстрого добавления в сметы</CardDescription>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Icon name="Plus" size={18} />
                    Добавить позицию
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="all">Все позиции</TabsTrigger>
                    <TabsTrigger value="work">Работы</TabsTrigger>
                    <TabsTrigger value="material">Материалы</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Наименование</TableHead>
                          <TableHead>Тип</TableHead>
                          <TableHead>Ед. изм.</TableHead>
                          <TableHead className="text-right">Цена</TableHead>
                          <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {workDirectory.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={
                                item.category === 'work' 
                                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                  : 'bg-purple-50 text-purple-700 border-purple-200'
                              }>
                                {item.category === 'work' ? 'Работа' : 'Материал'}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell className="text-right font-semibold">
                              {item.price.toLocaleString('ru-RU')} ₽
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button variant="ghost" size="sm">
                                  <Icon name="Edit" size={16} />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
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
              <Button variant="outline">
                <Icon name="FileDown" size={18} className="mr-2" />
                Экспорт в PDF
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
    </div>
  );
};

export default Index;