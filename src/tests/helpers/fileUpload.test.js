
import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";


cloudinary.config({ 
    cloud_name: 'djcelcktr', 
    api_key: '219984642435219', 
    api_secret: 'Lib0Nuz_sCZDu8ryqqGqcLcCKto' 
});

describe('Pruebas en el fileUpload', () => {

    test('debe de cargar un archivo y retornar el url', async ( done ) => {
        
        const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pac-Man_Cutscene.svg/283px-Pac-Man_Cutscene.svg.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        //Borrar imagen por ID

        const segments = url.split('/');
 
        const imageId = segments[ segments.length -1 ].replace('.png','')

        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done();
        });

    }); 


    test('debe de retornar un error', async () => {
        
        const file = new File([], 'foto.png');
        const url = await fileUpload( file );

        expect(  url ).toBe( null );

    }); 
});
