import React from "react";
import { Form, Input } from "reactstrap";

const SearchCountry = (props) => {

    const [selected, setSelected] = React.useState("");

    function handleSubmit(e){
        props.pickCountry(selected)
    }

  return (
    <div>
        <Form onSubmit={handleSubmit}>

      <Input
        type="select"
        name="selected"
        onChange={(e) => props.handleChange(e.target.value)}
        value={props.selected}
      >
        {props.country.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </Input>
        </Form>
    </div>
  );
};

export default SearchCountry;
