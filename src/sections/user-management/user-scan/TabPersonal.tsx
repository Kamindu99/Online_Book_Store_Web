import MainCard from 'components/MainCard';
import TransferBookList from 'pages/book-management/my-books/list/List';

// ==============================|| TAB - PERSONAL ||============================== //

const TabPersonal = () => {

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  return (
    <MainCard>
      <MainCard content={false} title="Borrow Books List">
        <div style={{ padding: '20px' }}>
          <TransferBookList />
        </div>
      </MainCard><br />
      <MainCard content={false} title="Past Read Books List">
        <div style={{ padding: '20px' }}>
          <TransferBookList />
        </div>
      </MainCard>
    </MainCard>
  );
};

export default TabPersonal;
