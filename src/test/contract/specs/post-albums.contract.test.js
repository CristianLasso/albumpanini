import {provider} from '../config/init-pact';  
import {Matchers} from '@pact-foundation/pact';
import {AlbumController} from '../../../src/controllers';

describe('Album Service', () => {     
    describe('When a request to post one album is made', () => {         
        beforeAll(async () => {             
            await provider.setup();             
            await provider.addInteraction({     
                uponReceiving: 'a request to post one album',     
                state: "has the albums",     
                withRequest: {         
                    method: 'POST',         
                    path: '/albums'     
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
            const album = {
                albumName: 'Name',
                laminasNumber: 0,
                laminas: [],
                userref: "m4DbIGm7U2OB4Bmqew4nRKoiP7p2",
            };            
         const response = await AlbumController.register(album);
         expect(response.data).toMatchSnapshot();
         await provider.verify();      
        });          
        afterAll(() => provider.finalize());     
    }); 
});