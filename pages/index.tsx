
import { chakra } from '@chakra-ui/react'
import Footer from '@components/Footer'
import Input from '@components/Input'
import CheckboxInput from '@components/Input/CheckboxInput'
import RadioInput from '@components/Input/RadioInput'
import Navbar from '@components/Navbar'
import { allergies, services, symptoms, whyWeLove } from '@utils/constants'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'


const Home: NextPage = () => {
  const [otherSymptoms, setOtherSymptoms] = useState(undefined);
  const [otherAllergies, setOtherAllergies] = useState(undefined);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    illnessCause: "",
    symptoms: [],
    allergies: []
  });

  const handleSymptoms = (e: { target: { value: string } }) => {
    const current = formValues.symptoms

    if (e.target.value === "other" ) {
      if(otherSymptoms) return setOtherSymptoms(undefined);
      if(!otherSymptoms) return setOtherSymptoms(e.target.value);
    };

    if (current.includes(e.target.value)) {
      const i = current.indexOf(e.target.value);
      current.splice(i, 1)
      setFormValues({ ...formValues, symptoms: current })
    } else {
      setFormValues({ ...formValues, symptoms: [...formValues.symptoms, e.target.value] })
    }
    return null;
  };

  const handleAllergies = (e: { target: { value: string } }) => {
    const current = formValues.allergies;

    if (e.target.value === "other") {
      if(otherAllergies) return setOtherAllergies(undefined);
      if(!otherAllergies) return setOtherAllergies(e.target.value);
    };

    if (current.includes(e.target.value)) {
      const i = current.indexOf(e.target.value);
      current.splice(i, 1)
      setFormValues({ ...formValues, allergies: current })
    } else {
      setFormValues({ ...formValues, allergies: [...formValues.allergies, e.target.value] })
    }
    return null;
  };

  return (
    <>
      <Navbar />

      <chakra.section
        px={{ base: "2rem", md: "4rem", xl: "0" }}
        h={{ xl: "calc(100vh - 9.3rem)" }}
        display="flex"
        alignItems="center"
        pt={{ base: "4rem", xl: "0" }}
      >
        <chakra.div
          display="flex"
          flexDir={{ base: "column", xl: "row" }}
          alignItems="center"
          justifyContent={{ lg: "space-between" }}
          w="full"
          maxW="1512px"
          px={{ xl: "12rem" }}
          mx="auto"
        >
          <chakra.div
            maxW="57.3rem"
          >
            <chakra.h1
              fontWeight="700"
              fontSize="4.8rem"
              lineHeight="120%"
              color="#191D23"
              maxW="50.9rem"
            >
              Virtual healthcare for you and your family
            </chakra.h1>
            <chakra.p
              mt="2rem"
              fontWeight="500"
              fontSize="1.8rem"
              lineHeight="150%"
              color="#4B5768"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu, nam habitant dolor sed vestibulum dui lectus potenti eu. Volutpat urna condimentum accumsan, proin sed cras nec.
            </chakra.p>

            <chakra.div
              mt="4rem"
              display="flex"
              flexDir={{ base: "column", xl: "row" }}
              gap="1.6rem"
            >
              <Link href="#prognosis" passHref>
                <chakra.a
                  fontWeight="700"
                  fontSize="1.4rem"
                  lineHeight="2.1rem"
                  color="#1374E7"
                  bg="white"
                  p="1.75rem 3.2rem"
                  border="1px solid #1374E7"
                  borderRadius="40px"
                  display="inline-block"
                  textAlign="center"
                >
                  Get a free prognosis
                </chakra.a>
              </Link>

              <Link href="register/patient" passHref>
                <chakra.a
                  fontWeight="700"
                  fontSize="1.4rem"
                  lineHeight="2.1rem"
                  color="white"
                  bg="#1374E7"
                  p="1.75rem 3.2rem"
                  borderRadius="40px"
                  display="inline-block"
                  textAlign="center"
                >
                  Book an appointment
                </chakra.a>
              </Link>
            </chakra.div>
          </chakra.div>

          <chakra.img
            w="full"
            maxW="54.4rem"
            mx={{ base: "auto", xl: "0" }}
            src="/assets/image/hero-img.png"
            alt="doctor"
          />
        </chakra.div>
      </chakra.section>

      <chakra.section
        px={{ base: "2rem", md: "4rem", xl: "0" }}
        py="8rem"
        bg="#F1F7FE"
        mt={{ base: "8.2rem", xl: "0" }}
      >
        <chakra.div
          px={{ xl: "12rem" }}
          display="flex"
          flexDir="column"
          alignItems="center"
          gap="5.6rem"
          maxW="151.2rem"
          mx="auto"
        >
          <chakra.h2
            fontWeight="700"
            fontSize="3.2rem"
            lineHeight="4.4rem"
            color="#191D23"
          >
            Why we love Hasheera
          </chakra.h2>

          <chakra.div
            display="grid"
            gridTemplateColumns={{ lg: "1fr 1fr 1fr" }}
            gap="4rem"
          >
            {whyWeLove.map(({ id, icon, title, text }) => (
              <chakra.div
                key={id}
                p="2.4rem"
                bg="white"
                borderRadius="1.2rem"
                maxW="37.3rem"
              >
                <chakra.img src={icon} alt={title} />
                <chakra.h6
                  fontFamily="Gilroy-semibold"
                  fontWeight="600"
                  fontSize="1.8rem"
                  lineHeight="2.1rem"
                  color="#141D3E"
                  mt="2rem"
                >
                  {title}
                </chakra.h6>
                <chakra.p
                  fontWeight="500"
                  fontSize="1.6rem"
                  lineHeight="130%"
                  color="#515151"
                  mt="1.2rem"
                >
                  {text}
                </chakra.p>
              </chakra.div>
            ))}
          </chakra.div>
        </chakra.div>
      </chakra.section>

      <chakra.section
        px={{ base: "2rem", md: "4rem", xl: "0" }}
        py="8rem"
      >
        <chakra.div
          px={{ xl: "12rem" }}
          display="flex"
          flexDir="column"
          alignItems="center"
          maxW="151.2rem"
          mx="auto"
        >
          <chakra.h2
            fontWeight="700"
            fontSize="3.2rem"
            lineHeight="4.4rem"
            color="#191D23"
            textAlign="center"
          >
            Healthcare like never before
          </chakra.h2>
          <chakra.p
            fontWeight="500"
            fontSize="1.6rem"
            lineHeight="150%"
            color="#4B5768"
            textAlign="center"
            maxW="61.2rem"
            mt="1.2rem"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sapien ultrices donec id lectus dictum. Tincidunt ultrices aliquam mauris, egestas. Cras sit metus.
          </chakra.p>

          <chakra.div
            mt="6.4rem"
            maxW="110rem"
            mx="auto"
            display="flex"
            flexDir='column'
            gap="8rem"
          >
            {services.map(({ id, label, title, text, photo }, i) => (
              <chakra.div
                key={id}
                display="grid"
                gridTemplateColumns={{ xl: "auto auto" }}
                gap="5.2rem"
              >
                <chakra.div
                  gridColumn={{ xl: i % 2 && "2/3" }}
                  gridRow={{ xl: i % 2 && "1/2" }}
                  mt={{ xl: "7.75rem" }}
                >
                  <chakra.span
                    fontFamily="Gilroy-semibold"
                    fontWeight="600"
                    fontSize="1.2rem"
                    lineHeight="1.4rem"
                    color="#1374E7"
                    p="0.8rem"
                    bg="#F1F7FE"
                    borderRadius="4rem"
                  >
                    {label}
                  </chakra.span>
                  <chakra.h2
                    fontWeight="700"
                    fontSize="3.2rem"
                    lineHeight="4.4rem"
                    color="#191D23"
                    mt="0.8rem"
                  >
                    {title}
                  </chakra.h2>
                  <chakra.p
                    fontWeight="500"
                    fontSize="1.6rem"
                    lineHeight="150%"
                    color="#4B5768"
                    maxW="42rem"
                    mt="2rem"
                  >
                    {text}
                  </chakra.p>

                  <Link href="#prognosis" passHref>
                    <chakra.a
                      mt="2rem"
                      fontWeight="700"
                      fontSize="1.4rem"
                      lineHeight="2.1rem"
                      color="white"
                      bg="#1374E7"
                      p="1.75rem 3.2rem"
                      borderRadius="40px"
                      display="inline-block"
                      textAlign="center"
                    >
                      Try it out now
                    </chakra.a>
                  </Link>
                </chakra.div>

                <chakra.img src={photo} maxW="62.8rem" w="full" gridColumn={i % 2 && "1/2"} alt={title} />
              </chakra.div>
            ))}
          </chakra.div>
        </chakra.div>
      </chakra.section>

      <chakra.section
        id="prognosis"
        px={{ base: "2rem", md: "4rem", xl: "0" }}
        py="8rem"
        bg="#F1F7FE"
        mt={{ base: "8.2rem", xl: "0" }}
      >
        <chakra.div
          px={{ xl: "12rem" }}
          display="flex"
          flexDir="column"
          alignItems="center"
          maxW="151.2rem"
          mx="auto"
        >
          <chakra.h2
            fontWeight="700"
            fontSize="3.2rem"
            lineHeight="4.4rem"
            color="#191D23"
            textAlign="center"
          >
            Got symptoms? Get a free prognosis today
          </chakra.h2>
          <chakra.p
            fontWeight="500"
            fontSize="1.6rem"
            lineHeight="150%"
            color="#4B5768"
            textAlign="center"
            maxW="61.2rem"
            mt="1.2rem"
          >
            Fil the form below and we would tell you possible causes of the symtoms you have. Book an appointment with a doctor and we would tell you where to go from there.
          </chakra.p>

          <chakra.form
            m="6.4rem auto 0"
            p="2.4rem"
            border="1px solid #A1C8F7"
            borderRadius="1.2rem"
            bg="white"
            maxW="62rem"
            w="full"
          >
            <chakra.h3
              fontWeight="700"
              fontSize="2.4rem"
              lineHeight="3.3rem"
              color="#191D23"
            >
              Prognosis form
            </chakra.h3>

            <chakra.div
              mt="3.2rem"
              display="flex"
              flexDir={{ base: "column", lg: "row" }}
              gap={{ base: "1.2rem", lg: "0.8rem" }}
            >
              <Input
                id="first-name"
                label="First Name"
                placeholder="Chidumebi"
                value={formValues.firstName}
                onChange={e => setFormValues({ ...formValues, firstName: e.target.value })}
              />

              <Input
                id="last-name"
                label="Last Name"
                placeholder="Ibrahimovich"
                value={formValues.lastName}
                onChange={e => setFormValues({ ...formValues, lastName: e.target.value })}
              />
            </chakra.div>

            <chakra.div mt="2rem">
              <Input
                id="email"
                label="Email"
                placeholder="a@email.com"
                value={formValues.email}
                onChange={e => setFormValues({ ...formValues, email: e.target.value })}
              />
            </chakra.div>

            <chakra.div mt="2rem">
              <chakra.p
                fontWeight="500"
                fontSize="1.6rem"
                lineHeight="1.9rem"
                color="#191D23"
              >
                Cause of current problem:
              </chakra.p>

              <chakra.div
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                gap="1.2rem"
                mt="1.8rem"
              >
                <RadioInput
                  id="accident"
                  onChange={e => setFormValues({ ...formValues, illnessCause: e.target.value })}
                  value="accident"
                  name="illness-cause"
                  title='Accident'
                  selected={formValues.illnessCause === "accident"}
                />
                <RadioInput
                  id="gradual"
                  onChange={e => setFormValues({ ...formValues, illnessCause: e.target.value })}
                  value="gradual"
                  name="illness-cause"
                  title="Gradual onset"
                  selected={formValues.illnessCause === "gradual"}
                />
                <RadioInput
                  id="other"
                  onChange={e => setFormValues({ ...formValues, illnessCause: e.target.value })}
                  value="other"
                  name="illness-cause"
                  title="Other"
                  selected={formValues.illnessCause === "other"}
                />
              </chakra.div>
            </chakra.div>

            <chakra.div mt="2rem">
              <chakra.p
                fontWeight="500"
                fontSize="1.6rem"
                lineHeight="1.9rem"
                color="#191D23"
              >
                Symptoms (please select all that apply)
              </chakra.p>

              <chakra.div
                display="grid"
                gridTemplateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }}
                rowGap="1.6rem"
                mt="1.8rem"
              >
                {symptoms.map(({ id, symptom }) => {
                  const v = symptom.split(" ").join("-").toLowerCase();

                  return (
                    <CheckboxInput
                      key={id}
                      id={`${v}-symptoms`}
                      onChange={e => handleSymptoms(e)}
                      value={v}
                      name={v}
                      title={symptom}
                      selected={v === "other" ? otherSymptoms : formValues.symptoms.includes(v)}
                    />
                  )
                })}
              </chakra.div>

              {otherSymptoms && <chakra.div mt="2rem">
                <Input
                  id="other-symptoms"
                  label="Other (Separate with commas)"
                  placeholder="State other symptoms"
                  onChange={e => setOtherSymptoms(e.target.value)}
                />
              </chakra.div>}
            </chakra.div>

            <chakra.div mt="2rem">
              <chakra.p
                fontWeight="500"
                fontSize="1.6rem"
                lineHeight="1.9rem"
                color="#191D23"
              >
                Allergies
              </chakra.p>

              <chakra.div
                display="grid"
                gridTemplateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }}
                rowGap="1.6rem"
                mt="1.8rem"
              >
                {allergies.map(({ id, allergy }) => {
                  const v = allergy.split(" ").join("-").toLowerCase();

                  return (
                    <CheckboxInput
                      key={id}
                      id={`${v}-allergy`}
                      onChange={e => handleAllergies(e)}
                      value={v}
                      name={v}
                      title={allergy}
                      selected={v === "other" ? otherAllergies : formValues.allergies.includes(v)}
                    />
                  )
                })}
              </chakra.div>

              {otherAllergies && <chakra.div mt="2rem">
                <Input
                  id="other-allergies"
                  label="Other (Separate with commas)"
                  placeholder="State other allergies"
                  onChange={e => setOtherAllergies(e.target.value)}
                />
              </chakra.div>}
            </chakra.div>

            <chakra.a
              fontWeight="700"
              fontSize="1.4rem"
              lineHeight="2.1rem"
              color="white"
              bg="#1374E7"
              p="1.75rem 3.2rem"
              borderRadius="40px"
              display="block"
              textAlign="center"
              mt="4rem"
              ml="auto"
              w={{ md: "fit-content" }}
            >
              Book an appointment
            </chakra.a>
          </chakra.form>
        </chakra.div>
      </chakra.section>

      <Footer />
    </>
  )
}

export default Home
