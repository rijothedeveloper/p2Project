import { Container, FloatingLabel, Form } from "react-bootstrap";

export const ItemsByName: React.FC<{
    setNameFilter: React.Dispatch<React.SetStateAction<string>>
}> = ({setNameFilter}) => {

    const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    }

    return (
        <Container className="mt-1">
            <FloatingLabel controlId="inputNameFilter" label="Name">
                <Form.Control type="text" placeholder="Enter a name" defaultValue="" onChange={handleNameFilterChange} />
            </FloatingLabel>
        </Container>
    )
};