import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d', // Fondo negro
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    left: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffffff', // dorado
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4682B4',
    marginTop: 70,
    marginBottom: 20,
  },
  card: {
    width: '85%',
    height: 100,
    backgroundColor: '#1A1A1A', // gris oscuro con contraste
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#4682B4',
  },
  plus: {
    fontSize: 40,
    color: '#4682B4',
  },
  cardText: {
    fontSize: 18,
    color: '#ffffffff',
  },
});

export default styles;
