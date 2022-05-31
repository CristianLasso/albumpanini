import {provider} from '../config/init-pact';  
import {Matchers} from '@pact-foundation/pact';
import {AlbumController} from '../../../src/controllers';

describe('Album Service', () => {     
    describe('When a request to delete one specific album is made', () => {         
        beforeAll(async () => {             
            await provider.setup();             
            await provider.addInteraction({     
                uponReceiving: 'a request to delete one album',     
                state: "has the album with the id",     
                withRequest: {         
                    method: 'DELETE',         
                    path: '/albums/118263'     
                },     
                willRespondWith: {         
                    status: 200,         
                    body: Matchers.eachLike({   
                            albumid: Matchers.like(118263),              
                            albumName: Matchers.like('Name'),                 
                            laminasNumber: Matchers.like(0),                 
                            laminas: Matchers.like([]),                 
                            userref: Matchers.like("m4DbIGm7U2OB4Bmqew4nRKoiP7p2")             
                        })     
                    } 
                });         
        });          
        test('should return the correct data', async () => {             
         const response = await AlbumController.delete("118263");
         expect(response.data).toMatchSnapshot();
         await provider.verify();      
        });          
        afterAll(() => provider.finalize());     
    }); 
});