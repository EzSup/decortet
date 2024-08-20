import { ChakraProvider,  Table, TableContainer, Tbody, Td, Th, Thead, Tr, 
    HStack, Button, Drawer, DrawerOverlay, DrawerContent, DrawerFooter, DrawerCloseButton, DrawerHeader, 
    DrawerBody, Stack, Box, FormLabel, Input, 
    Switch, Image} from "@chakra-ui/react";
import { Product, ProductCreate } from "../models/productModels";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { PostProduct, PutProduct } from "../services/adminService";
import { Trash } from "@phosphor-icons/react";

export default function AdminPage(){

    const [editProduct, setEditProduct] = useState<Product|null>(null);
    const [createProduct, setCreateProduct] = useState<ProductCreate>();
    const [products, setProducts] = useState<Product[]>([]);
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
        axios.get(`https://localhost:32768/User/Get`)
        .then((response: AxiosResponse<Product[]>) => {
          setProducts(response.data);
        });
        
        };
        fetchProducts();
    }, []);

    function openEditBar(product:Product){
        setEditProduct(product);
        setEditOpen(true);
    }

    const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setEditProduct(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){
        setCreateProduct(prevState => ({
            ...prevState,
            photos: e.target.files
        }))
    }

    const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setCreateProduct(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    async function confirmCreate() {
        console.log(createProduct);
        if(createProduct)
            await PostProduct(createProduct);
    }
    
    const confirmEdit = () =>{
        console.log(editProduct);
        if(editProduct)
            PutProduct(editProduct);
    }

    function removeImage(link:string){
        if(!editProduct)
            return;
        const updatedPhotoLinks = editProduct.photoLinks?.filter(x => x !== link);
        setEditProduct({ ...editProduct, photoLinks: updatedPhotoLinks})
    }

    return(<>
        <ChakraProvider>
        <Button colorScheme='teal' onClick={() => setCreateOpen(true)}>
        Створити нового
        </Button>
            <HStack >
                <TableContainer width={"100%"}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Назва</Th>
                                <Th>Ціна</Th>
                                <Th>Доступна</Th>
                                <Th>Редагувати</Th>
                                <Th>Видалити</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {products.map(prodct=>(
                                <Tr key={prodct.id}>
                                    <Td>{prodct.name}</Td>
                                    <Td>{prodct.price}</Td>
                                    <Td>{prodct.available ? 'ТАК' : 'НІ'}</Td>
                                    <Td>
                                        <Button colorScheme='yellow' onClick={() => openEditBar(prodct)}>
                                            Редагувати
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button colorScheme='red' >
                                            Видалити
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}                        
                        </Tbody>
                    </Table>
                </TableContainer>
                <Drawer
                    onClose={onClose}
                    isOpen={createOpen}
                    placement='left'>
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton onClick={() => setCreateOpen(false)}/>
                    <DrawerHeader borderBottomWidth='1px'>
                        Створити новий
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                        <Box>
                            <FormLabel htmlFor='name'>Назва</FormLabel>
                            <Input
                            id='name'
                            value={createProduct?.name}
                            onChange={handleChangeCreate}
                            required
                            />
                        </Box>

                        <Box>
                            <FormLabel  htmlFor='price'>Ціна</FormLabel>
                            <Input
                            id='price'
                            value={createProduct?.price}
                            onChange={handleChangeCreate}
                            required
                            />
                        </Box>

                        <Box>
                            <FormLabel htmlFor='available'>Доступно</FormLabel>
                            <Switch colorScheme='teal' size='lg'
                            id="available"
                            checked={createProduct?.available}
                            onChange={handleChangeCreate}/>
                        </Box>

                        <Box>
                            <FormLabel htmlFor='underheader'>Підрядок</FormLabel>
                            <Input
                            id='underheader'
                            value={createProduct?.underheader ?? ''}
                            onChange={handleChangeCreate}
                            />
                        </Box>

                        <Box>
                            <FormLabel htmlFor='description'>Опис</FormLabel>
                            <Input
                            id='description'
                            value={createProduct?.description ?? ''}
                            onChange={handleChangeCreate}/>
                        </Box>

                        <Box>
                            <FormLabel htmlFor='photoLinks'>Фото</FormLabel>
                            <Input
                            id='photos' type="file" accept=".jpg, .png, .webp"
                            onChange={handleImageChange} multiple/>
                            <Button colorScheme="purple" marginTop={3}>Підтвердити відправку</Button>
                            <Image src=""/>
                        </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button colorScheme='blue' onClick={confirmCreate}>Submit</Button>
                    </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                <Drawer
                    onClose={onClose}
                    isOpen={editOpen}
                    placement='right'>
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton onClick={() => setEditOpen(false)}/>
                    <DrawerHeader borderBottomWidth='1px'>
                        Редагувати дані
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Input id="id" value={editProduct?.id} onChange={handleChangeEdit} display={"none"} required/>
                        <Box>
                            <FormLabel htmlFor='name'>Назва</FormLabel>
                            <Input
                            value={editProduct?.name}
                            id='name'
                            onChange={handleChangeEdit}
                            required
                            />
                        </Box>

                        <Box>
                            <FormLabel  htmlFor='price'>Ціна</FormLabel>
                            <Input
                            value={editProduct?.price}
                            id='price'
                            onChange={handleChangeEdit}
                            required
                            />
                        </Box>

                        <Box>
                            <FormLabel htmlFor='available'>Доступно</FormLabel>
                            <Switch colorScheme='teal' size='lg' id="available-edit" 
                            isChecked={editProduct?.available} 
                            onChange={handleChangeEdit}/>
                        </Box>

                        <Box>
                            <FormLabel htmlFor='underheader'>Підрядок</FormLabel>
                            <Input
                            id='underheader'
                            value={editProduct?.underheader ?? ''}   
                            onChange={handleChangeEdit}                         
                            />
                        </Box>

                        <Box>
                            <FormLabel id='description-edit' htmlFor='description'>Опис</FormLabel>
                            <Input
                            id='description'
                            value={editProduct?.description ?? ''}
                            onChange={handleChangeEdit}
                            />
                        </Box>

                        <Box>
                            <FormLabel htmlFor='photoLinks'>Фото</FormLabel>
                            <input
                            id='photos' type="file" accept=".jpg, .png, .webp"
                            onChange={handleChangeEdit} />
                            <Button colorScheme="purple" marginTop={3}>Підтвердити відправку</Button>
                            <div style={{display: "flex", marginTop: "6px"}}>
                                {  editProduct?.photoLinks?.map(image => (
                                    <div key={image} style={{position: 'relative', display: 'inline-block'}}>
                                        <Button 
                                        onClick={() => { removeImage(image)}}
                                        colorScheme="red" 
                                        style={{ 
                                            position: 'absolute', 
                                            top: 0, 
                                            right: 0, 
                                            zIndex: 1,
                                            padding: 0 ,
                                            justifyContent: 'center'
                                        }}><Trash size={24}/> </Button>
                                        <img src={image} width={100}/>
                                    </div>
                                    
                                ))}
                            </div>                            
                        </Box>

                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button colorScheme='blue' onClick={confirmEdit}>Submit</Button>
                    </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </HStack>
            
        </ChakraProvider>
    </>);
}

function onClose(){

}
