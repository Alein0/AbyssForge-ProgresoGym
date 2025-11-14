import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
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
    color: '#ffffff',
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
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    marginHorizontal:"auto",
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

  // NUEVO: estructura interna de las card de rutinas


  cardText: {
    fontSize: 18,
    color: '#ffffff',
  },

  cardSubText: {
    color: '#aaa',
    fontSize: 15,
    marginTop: 4,
  },
});

export default styles;
