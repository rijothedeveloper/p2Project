import { Container, FloatingLabel, Form } from "react-bootstrap";

export const ObjectsByName: React.FC<{
    setNameFilter: React.Dispatch<React.SetStateAction<string>>,
    label: string
}> = ({setNameFilter, label}) => {

    const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    }

    return (
        <Container className="mt-1">
            <FloatingLabel controlId="inputNameFilter" label={label}>
                <Form.Control type="text" placeholder="Enter a name" defaultValue="" onChange={handleNameFilterChange} />
            </FloatingLabel>
        </Container>
    )
};