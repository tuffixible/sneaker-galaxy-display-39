
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SizeGuide = () => {
  const { language } = useLanguage();
  
  // Content for different languages
  const getSizeGuideContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Guia de Tamanhos",
          subtitle: "Encontre o tamanho perfeito para seus pés",
          measureTitle: "Como Medir",
          measureSteps: [
            "Coloque uma folha de papel no chão contra uma parede",
            "Fique em pé na folha com o calcanhar contra a parede",
            "Marque a posição do dedo mais longo no papel",
            "Meça a distância da parede até a marca (em cm)",
            "Use a tabela abaixo para encontrar seu tamanho ideal"
          ],
          menSizes: "Tamanhos Masculinos",
          womenSizes: "Tamanhos Femininos",
          kidsSizes: "Tamanhos Infantis",
          euSize: "EU",
          usSize: "EUA",
          ukSize: "Reino Unido",
          footLength: "Comprimento (cm)",
          tipsTitle: "Dicas para o Ajuste Perfeito",
          tips: [
            "Meça seus pés no final do dia, quando estão ligeiramente maiores",
            "Se estiver entre dois tamanhos, escolha o maior",
            "Considere a largura do seu pé, além do comprimento",
            "Diferentes marcas podem ter pequenas variações de tamanho"
          ],
          helpText: "Precisa de mais ajuda para encontrar seu tamanho perfeito? Entre em contato com nosso atendimento ao cliente."
        };
      case 'es':
        return {
          title: "Guía de Tallas",
          subtitle: "Encuentra la talla perfecta para tus pies",
          measureTitle: "Cómo Medir",
          measureSteps: [
            "Coloca una hoja de papel en el suelo contra una pared",
            "Párate en la hoja con el talón contra la pared",
            "Marca la posición del dedo más largo en el papel",
            "Mide la distancia desde la pared hasta la marca (en cm)",
            "Usa la tabla a continuación para encontrar tu talla ideal"
          ],
          menSizes: "Tallas de Hombres",
          womenSizes: "Tallas de Mujeres",
          kidsSizes: "Tallas de Niños",
          euSize: "EU",
          usSize: "EEUU",
          ukSize: "Reino Unido",
          footLength: "Longitud (cm)",
          tipsTitle: "Consejos para el Ajuste Perfecto",
          tips: [
            "Mide tus pies al final del día, cuando están ligeramente más grandes",
            "Si estás entre dos tallas, elige la más grande",
            "Considera el ancho de tu pie, además de la longitud",
            "Diferentes marcas pueden tener pequeñas variaciones de talla"
          ],
          helpText: "¿Necesitas más ayuda para encontrar tu talla perfecta? Contacta a nuestro servicio al cliente."
        };
      default: // 'en'
        return {
          title: "Size Guide",
          subtitle: "Find the perfect size for your feet",
          measureTitle: "How to Measure",
          measureSteps: [
            "Place a sheet of paper on the floor against a wall",
            "Stand on the paper with your heel against the wall",
            "Mark the position of your longest toe on the paper",
            "Measure the distance from the wall to the mark (in cm)",
            "Use the chart below to find your ideal size"
          ],
          menSizes: "Men's Sizes",
          womenSizes: "Women's Sizes",
          kidsSizes: "Kids' Sizes",
          euSize: "EU",
          usSize: "US",
          ukSize: "UK",
          footLength: "Foot Length (cm)",
          tipsTitle: "Tips for Perfect Fit",
          tips: [
            "Measure your feet at the end of the day when they are slightly larger",
            "If you are between two sizes, choose the larger one",
            "Consider the width of your foot as well as the length",
            "Different brands may have slight size variations"
          ],
          helpText: "Need more help finding your perfect size? Contact our customer service."
        };
    }
  };
  
  const content = getSizeGuideContent();
  
  // Size charts data
  const menSizes = [
    { eu: "38", us: "6", uk: "5", length: "24.0" },
    { eu: "39", us: "6.5", uk: "5.5", length: "24.6" },
    { eu: "40", us: "7", uk: "6", length: "25.2" },
    { eu: "41", us: "8", uk: "7", length: "25.8" },
    { eu: "42", us: "9", uk: "8", length: "26.4" },
    { eu: "43", us: "10", uk: "9", length: "27.0" },
    { eu: "44", us: "11", uk: "10", length: "27.6" },
    { eu: "45", us: "12", uk: "11", length: "28.3" },
    { eu: "46", us: "13", uk: "12", length: "28.9" }
  ];
  
  const womenSizes = [
    { eu: "35", us: "5", uk: "3", length: "22.1" },
    { eu: "36", us: "5.5", uk: "3.5", length: "22.5" },
    { eu: "37", us: "6", uk: "4", length: "23.0" },
    { eu: "38", us: "7", uk: "5", length: "23.5" },
    { eu: "39", us: "8", uk: "6", length: "24.1" },
    { eu: "40", us: "9", uk: "7", length: "24.8" },
    { eu: "41", us: "10", uk: "8", length: "25.4" },
    { eu: "42", us: "11", uk: "9", length: "26.0" }
  ];
  
  const kidsSizes = [
    { eu: "28", us: "11", uk: "10", length: "17.1" },
    { eu: "29", us: "11.5", uk: "10.5", length: "17.8" },
    { eu: "30", us: "12", uk: "11", length: "18.4" },
    { eu: "31", us: "13", uk: "12", length: "19.0" },
    { eu: "32", us: "1", uk: "13", length: "19.7" },
    { eu: "33", us: "2", uk: "1", length: "20.3" },
    { eu: "34", us: "3", uk: "2", length: "20.9" },
    { eu: "35", us: "4", uk: "3", length: "21.6" }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="container max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">{content.title}</h1>
            <p className="text-muted-foreground">{content.subtitle}</p>
          </div>
          
          <div className="space-y-10">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.measureTitle}</h2>
              <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                {content.measureSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">{content.menSizes}</h2>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{content.euSize}</TableHead>
                      <TableHead>{content.usSize}</TableHead>
                      <TableHead>{content.ukSize}</TableHead>
                      <TableHead>{content.footLength}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menSizes.map((size, index) => (
                      <TableRow key={index}>
                        <TableCell>{size.eu}</TableCell>
                        <TableCell>{size.us}</TableCell>
                        <TableCell>{size.uk}</TableCell>
                        <TableCell>{size.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">{content.womenSizes}</h2>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{content.euSize}</TableHead>
                      <TableHead>{content.usSize}</TableHead>
                      <TableHead>{content.ukSize}</TableHead>
                      <TableHead>{content.footLength}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {womenSizes.map((size, index) => (
                      <TableRow key={index}>
                        <TableCell>{size.eu}</TableCell>
                        <TableCell>{size.us}</TableCell>
                        <TableCell>{size.uk}</TableCell>
                        <TableCell>{size.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">{content.kidsSizes}</h2>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{content.euSize}</TableHead>
                      <TableHead>{content.usSize}</TableHead>
                      <TableHead>{content.ukSize}</TableHead>
                      <TableHead>{content.footLength}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kidsSizes.map((size, index) => (
                      <TableRow key={index}>
                        <TableCell>{size.eu}</TableCell>
                        <TableCell>{size.us}</TableCell>
                        <TableCell>{size.uk}</TableCell>
                        <TableCell>{size.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.tipsTitle}</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {content.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-secondary/30 p-8 rounded-lg text-center">
              <p className="text-lg">{content.helpText}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SizeGuide;
