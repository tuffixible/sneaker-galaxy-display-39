
import React from 'react';
import { Pencil, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface EditContentButtonProps {
  pageId: string;
}

const EditContentButton: React.FC<EditContentButtonProps> = ({ pageId }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleToggleEdit = () => {
    if (!isEditing) {
      // Starting edit mode
      setIsEditing(true);
      window.dispatchEvent(new CustomEvent('startContentEditing', { detail: { pageId } }));
      
      toast({
        title: "Modo de edição ativado",
        description: "Clique nos elementos para editar. Salve as alterações quando terminar.",
      });
    } else {
      // Ending edit mode - trigger save event
      setIsEditing(false);
      window.dispatchEvent(new CustomEvent('saveContentEditing', { detail: { pageId } }));
      
      toast({
        title: "Alterações salvas",
        description: "O conteúdo da página foi atualizado com sucesso.",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    window.dispatchEvent(new CustomEvent('cancelContentEditing'));
    
    toast({
      title: "Edição cancelada",
      description: "As alterações foram descartadas.",
    });
  };

  const goToAdmin = () => {
    navigate('/admin/site-content');
  };

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <div className="fixed top-24 right-6 z-40 flex gap-2">
      {isEditing ? (
        <>
          <Button 
            size="sm" 
            className="bg-green-500 hover:bg-green-600"
            onClick={handleToggleEdit}
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleCancel}
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        </>
      ) : (
        <>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleToggleEdit}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Editar Página
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={goToAdmin}
          >
            Painel Admin
          </Button>
        </>
      )}
    </div>
  );
};

export default EditContentButton;
