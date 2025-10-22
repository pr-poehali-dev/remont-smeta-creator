import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentType: 'contract' | 'estimate' | 'act';
  documentNumber: string;
  recipientEmail?: string;
  recipientName?: string;
}

export const EmailDialog = ({ 
  open, 
  onOpenChange, 
  documentType, 
  documentNumber,
  recipientEmail = '',
  recipientName = ''
}: EmailDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState(recipientEmail);
  const [subject, setSubject] = useState(getDefaultSubject());
  const [message, setMessage] = useState(getDefaultMessage());
  const [isSending, setIsSending] = useState(false);

  function getDocumentTypeName() {
    switch (documentType) {
      case 'contract': return 'Договор';
      case 'estimate': return 'Смета';
      case 'act': return 'Акт выполненных работ';
    }
  }

  function getDefaultSubject() {
    return `${getDocumentTypeName()} № ${documentNumber}`;
  }

  function getDefaultMessage() {
    return `Добрый день${recipientName ? `, ${recipientName}` : ''}!

Направляем Вам ${getDocumentTypeName().toLowerCase()} № ${documentNumber} во вложении.

Пожалуйста, ознакомьтесь с документом.

С уважением,
СметаПро`;
  }

  const handleSendEmail = async () => {
    if (!email) {
      toast({
        title: "Ошибка",
        description: "Укажите email получателя",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Документ отправлен",
        description: `${getDocumentTypeName()} успешно отправлен на ${email}`,
      });
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Send" size={24} />
            Отправить документ по email
          </DialogTitle>
          <DialogDescription>
            {getDocumentTypeName()} № {documentNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email получателя *</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Тема письма</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Сообщение</Label>
            <Textarea
              id="message"
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <Icon name="Paperclip" size={18} className="text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold">Вложение:</p>
                <p>{getDocumentTypeName()} № {documentNumber}.pdf</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSending}>
            Отмена
          </Button>
          <Button onClick={handleSendEmail} disabled={isSending} className="gap-2">
            {isSending ? (
              <>
                <Icon name="Loader2" size={18} className="animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Icon name="Send" size={18} />
                Отправить
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
