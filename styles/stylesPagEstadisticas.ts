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
    top: 10,
    left: 20,
        paddingTop: 50,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4682B4',
   
    marginBottom: 20,
        paddingTop: 90,
  },
  dropdownContainer: {
    width: '85%',
    marginBottom: 20,
  },
  dropdownButton: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4682B4',
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dropdownArrow: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#4682B4',
    borderRadius: 8,
    marginTop: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  statsBox: {
    width: '85%',
    height: 250,
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4682B4',
  
  },
  statsTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#ffffffff',
  marginVertical: 16,
  textAlign: 'center',
},

  placeholderText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default styles;
