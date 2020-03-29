import { hot } from 'react-hot-loader';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { Header } from '../../components';

const Title = () => (
  <Typography component="p" variant="subtitle1" color="inherit">
    Hast Du Husten?
  </Typography>
);

const MyRadio = ({ options, id, question, preselected,info }) => {
  const renderedoptions = options.map((opt, idx) => <FormControlLabel value={idx} control={<Radio />} label={opt} />);
  const [value, setValue] = React.useState(preselected);
  const handleChange = (event) => {
    setValue(eval(event.target.value));
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{question}</FormLabel>

      <RadioGroup name={id} value={value} onChange={handleChange}>
        {renderedoptions}
      </RadioGroup>
    </FormControl>
  );
};

const Hustenview = () => (
  <>
    <Header />
    <div className="home">
      <Title />
      <MyRadio
        id="husten.hustentyp"
        question="Dein Husten ist eher..."
        options={['Trocken', 'Feucht', 'Ich weiss nicht','Kein Husten']}
        preselected={1}
      />
      <MyRadio
        id="husten.auswurf"
        info="Auswurf sind die (manchmal gelben) ausgehusteten Absonderungen der Atemswegschleimhäute"
        question="Hast Du Auswurf?"
        options={['Ja', 'Nein']}
        preselected={1}
      />
      <MyRadio id="husten.blut" question="Hustet Du Blut?" options={['Ja', 'Nein']} preselected={1} />
    </div>
  </>
);

const Hustenview2 = () => {
  const [value, setValue] = React.useState('female');

  return (
    <>
      <Header />
      <div className="home">
        <Title />
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            value={value}
            aria-label="gender"
            name="gender1"
            onChange={(event) => {
              setValue(event.target.value);
            }}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};

export default hot(module)(Hustenview);
