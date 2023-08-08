
import { SingleAccordion, ControlledAccordions } from "../components/Accordion";
import Title from "../components/Title";

//icon imports
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ForestIcon from '@mui/icons-material/Forest';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { faq } from "../Data";

interface CategoryFAQ {
  title: string;
  icon: string
  children: React.ReactNode;
}

const Category = (props: CategoryFAQ) => {
  const IconStyle = {
    height: 70,
    width: 70,
  }
  let iconElement = <AccountBoxIcon color="secondary" sx={IconStyle} />

  switch (props.icon) {
    case 'account':
      break;
    case 'question':
      iconElement = <QuestionMarkIcon color="secondary" sx={IconStyle} />
      break
    case 'rent':
      iconElement = <HandshakeIcon color="secondary" sx={IconStyle} />
      break;
    case 'ads':
      iconElement = <ReceiptIcon color="secondary" sx={IconStyle} />
      break;
    case 'support':
      iconElement = <SupportAgentIcon color="secondary" sx={IconStyle} />
      break;
    case 'forest':
      iconElement = <ForestIcon color="secondary" sx={IconStyle} />
      break;
  }
  return (
    <div className="flex w-1/2 my-7">
      <div className='flex flex-col w-11/12 h-auto text-left'>
        {iconElement}
        <h1 className="text-3xl dark:text-dark-white my-5">{props.title}</h1>
        {props.children}
      </div>
    </div>
  )
}


const FAQ = () => {
  return (
    <div className="flex h-auto w-screen bg-slate-100 dark:bg-dark-graa">
      <section className={'flex flex-col h-auto w-full content-center gap-10 bg-slate-100 dark:bg-dark-graa overflow-hidden m-20'}>
        <div className='flex m-auto w-full max-w-7xl p-10 text-current'>
          <div className="flex flex-col justify-start w-full h-full my-10 ">

            <Title size={"text-5xl"} heading={faq.title} description={faq.desc} />

            <div className="flex flex-row w-full flex-wrap">
              <Category title={faq.C1.title} icon="question">
                <ControlledAccordions>
                  <SingleAccordion question={faq.C1.qna[0].Q} answer={faq.C1.qna[0].A} panel={"panel1"} />
                  <SingleAccordion question={faq.C1.qna[1].Q} answer={faq.C1.qna[1].A} panel={"panel2"} />
                  <SingleAccordion question={faq.C1.qna[2].Q} answer={faq.C1.qna[2].A} panel={"panel3"} />
                  <SingleAccordion question={faq.C1.qna[3].Q} answer={faq.C1.qna[3].A} panel={"panel4"} />
                </ControlledAccordions>
              </Category>

              <Category title={faq.C2.title} icon='account'>
                <ControlledAccordions>
                  <SingleAccordion question={faq.C2.qna[0].Q} answer={faq.C2.qna[0].A} panel={"panel1"} />
                  <SingleAccordion question={faq.C2.qna[1].Q} answer={faq.C2.qna[1].A} panel={"panel1"} />
                  <SingleAccordion question={faq.C2.qna[2].Q} answer={faq.C2.qna[2].A} panel={"panel2"} />
                  <SingleAccordion question={faq.C2.qna[3].Q} answer={faq.C2.qna[3].A} panel={"panel3"} />
                </ControlledAccordions>
              </Category>

              <Category title={faq.C3.title} icon='ads'>
                <ControlledAccordions>
                  <SingleAccordion question={faq.C3.qna[0].Q} answer={faq.C3.qna[0].A} panel={"panel1"} />
                  <SingleAccordion question={faq.C3.qna[1].Q} answer={faq.C3.qna[1].A} panel={"panel1"} />
                </ControlledAccordions>
              </Category>

              <Category title={faq.C4.title} icon='rent'>
                <ControlledAccordions>
                  <SingleAccordion question={faq.C4.qna[0].Q} answer={faq.C4.qna[0].A} panel={"panel1"} />
                </ControlledAccordions>
              </Category>


              <Category title={faq.C5.title} icon='forest'>
                <ControlledAccordions>
                  <SingleAccordion question={faq.C5.qna[0].Q} answer={faq.C5.qna[0].A} panel={"panel1"} />
                  <SingleAccordion question={faq.C5.qna[1].Q} answer={faq.C5.qna[1].A} panel={"panel1"} />
                  <SingleAccordion question={faq.C5.qna[2].Q} answer={faq.C5.qna[2].A} panel={"panel2"} />
                </ControlledAccordions>
              </Category>

              <Category title={faq.C6.title} icon='support'>
                <ControlledAccordions>
                  <SingleAccordion question={faq.C6.qna[0].Q} answer={faq.C6.qna[0].A} panel={"panel1"} />
                  <SingleAccordion question={faq.C6.qna[1].Q} answer={faq.C6.qna[1].A} panel={"panel1"} />
                  <SingleAccordion question={faq.C6.qna[2].Q} answer={faq.C6.qna[2].A} panel={"panel2"} />
                </ControlledAccordions>
              </Category>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default FAQ;